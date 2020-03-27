namespace openfl._internal.renderer.flash;

import openfl.display.Bitmap;
import BitmapData from "../display/BitmapData";
import BlendMode from "../display/BlendMode";
import openfl.display.TileContainer;
import openfl.display.Tilemap;
import openfl.display.Tileset;
import ColorTransfrom from "../geom/ColorTransform";
import Matrix from "../geom/Matrix";
import Point from "../geom/Point";
import Rectangle from "../geom/Rectangle";

@: access(openfl.display.Tile)
@: access(openfl.display.TileContainer)
@: access(openfl.display.Tilemap)
@: access(openfl.display.Tileset)
@SuppressWarnings("checkstyle:FieldDocComment")
class FlashTilemap
{
	private static alphaColorTransform: ColorTransform = new ColorTransform();
	private static bitmap: Bitmap = new Bitmap();
	private static destPoint: Point = new Point();
	private static sourceRect: Rectangle = new Rectangle();

	public static readonly render(tilemap: Tilemap): void
	{
		// TODO: Do not render if top-level group is not dirty

		#if flash
		if (tilemap.stage == null || !tilemap.visible || tilemap.alpha <= 0 || tilemap.__group.__tiles.length == 0) return;

		var bitmapData = tilemap.bitmapData;

		bitmapData.lock();
		bitmapData.fillRect(bitmapData.rect, 0);

		renderTileContainer(tilemap.__group, bitmapData, new Matrix(), tilemap.__tileset, tilemap.smoothing, tilemap.tileAlphaEnabled, 1,
			tilemap.tileColorTransformEnabled, null, tilemap.tileBlendModeEnabled, NORMAL, null);

		bitmapData.unlock();
		#end
	}

	private static renderTileContainer(group: TileContainer, bitmapData: BitmapData, parentTransform: Matrix, defaultTileset: Tileset, smooth: boolean,
		alphaEnabled: boolean, worldAlpha: number, colorTransformEnabled: boolean, defaultColorTransform: ColorTransform, blendModeEnabled: boolean,
		defaultBlendMode: BlendMode, cacheBitmapData: BitmapData): void
	{
		#if flash
		var tileTransform = new Matrix();

		var tiles = group.__tiles;
		var length = group.__length;

		var tile,
			tileset,
			alpha,
			visible,
			blendMode = null,
			colorTransform = null,
			id,
			tileData,
			tileRect,
			sourceBitmapData,
			cacheAlpha;

		for (i in 0...length)
		{
			tile = tiles[i];

			tileTransform.setTo(1, 0, 0, 1, -tile.originX, -tile.originY);
			tileTransform.concat(tile.matrix);
			tileTransform.concat(parentTransform);

			// if (roundPixels) {

			// 	tileTransform.tx = Math.round (tileTransform.tx);
			// 	tileTransform.ty = Math.round (tileTransform.ty);

			// }

			tileset = tile.tileset != null ? tile.tileset : defaultTileset;

			alpha = tile.alpha * worldAlpha;
			visible = tile.visible;
			if (!visible || alpha <= 0) continue;

			if (blendModeEnabled)
			{
				blendMode = (tile.__blendMode != null) ? tile.__blendMode : defaultBlendMode;
			}

			if (colorTransformEnabled)
			{
				if (tile.colorTransform != null)
				{
					if (defaultColorTransform == null)
					{
						colorTransform = tile.colorTransform;
					}
					else
					{
						colorTransform = new ColorTransform();
						colorTransform.redMultiplier = defaultColorTransform.redMultiplier * tile.colorTransform.redMultiplier;
						colorTransform.greenMultiplier = defaultColorTransform.greenMultiplier * tile.colorTransform.greenMultiplier;
						colorTransform.blueMultiplier = defaultColorTransform.blueMultiplier * tile.colorTransform.blueMultiplier;
						colorTransform.alphaMultiplier = defaultColorTransform.alphaMultiplier * tile.colorTransform.alphaMultiplier;
						colorTransform.redOffset = defaultColorTransform.redOffset + tile.colorTransform.redOffset;
						colorTransform.greenOffset = defaultColorTransform.greenOffset + tile.colorTransform.greenOffset;
						colorTransform.blueOffset = defaultColorTransform.blueOffset + tile.colorTransform.blueOffset;
						colorTransform.alphaOffset = defaultColorTransform.alphaOffset + tile.colorTransform.alphaOffset;
					}
				}
				else
				{
					colorTransform = defaultColorTransform;
				}
			}

			if (!alphaEnabled) alpha = 1;

			if (tile.__length > 0)
			{
				renderTileContainer(cast tile, bitmapData, tileTransform, tileset, smooth, alphaEnabled, alpha, colorTransformEnabled, colorTransform,
					blendModeEnabled, blendMode, cacheBitmapData);
			}
			else
			{
				if (tileset == null) continue;

				id = tile.id;

				if (id == -1)
				{
					tileRect = tile.__rect;
					if (tileRect == null || tileRect.width <= 0 || tileRect.height <= 0) continue;
				}
				else
				{
					tileData = tileset.__data[id];
					if (tileData == null) continue;

					sourceRect.setTo(tileData.x, tileData.y, tileData.width, tileData.height);
					tileRect = sourceRect;
				}

				sourceBitmapData = tileset.__bitmapData;
				if (sourceBitmapData == null) continue;

				if (colorTransform != null)
				{
					cacheAlpha = colorTransform.alphaMultiplier;
					colorTransform.alphaMultiplier *= alpha;

					bitmap.bitmapData = sourceBitmapData;
					bitmap.smoothing = smooth;
					bitmap.scrollRect = sourceRect;

					bitmapData.draw(bitmap, tileTransform, colorTransform, blendMode, null, smooth);

					colorTransform.alphaMultiplier = cacheAlpha;
				}
				else if (alpha == 1 && tileTransform.a == 1 && tileTransform.b == 0 && tileTransform.c == 0 && tileTransform.d == 1 && blendMode == NORMAL)
				{
					destPoint.x = tileTransform.tx;
					destPoint.y = tileTransform.ty;

					bitmapData.copyPixels(sourceBitmapData, sourceRect, destPoint, null, null, true);
				}
				else if (alphaEnabled)
				{
					alphaColorTransform.alphaMultiplier = alpha;

					bitmap.bitmapData = sourceBitmapData;
					bitmap.smoothing = smooth;
					bitmap.scrollRect = sourceRect;

					bitmapData.draw(bitmap, tileTransform, alphaColorTransform, blendMode, null, smooth);
				}
				else
				{
					bitmap.bitmapData = sourceBitmapData;
					bitmap.smoothing = smooth;
					bitmap.scrollRect = sourceRect;

					bitmapData.draw(bitmap, tileTransform, null, blendMode, null, smooth);
				}
			}
		}
		#end
	}
}
