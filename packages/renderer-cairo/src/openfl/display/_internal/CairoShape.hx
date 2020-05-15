package openfl.display._internal;

#if openfl_cairo
import lime.math.Matrix3;
import lime.graphics.cairo.CairoFilter;
import lime.graphics.cairo.CairoPattern;
import openfl.display.DisplayObject;
import openfl.geom.Matrix;
import openfl.geom._Matrix;

#if !openfl_debug
@:fileXml('tags="haxe,release"')
@:noDebug
#end
@:access(openfl.display.DisplayObject)
@:access(openfl.display.Graphics)
@:access(openfl.geom.Matrix)
@SuppressWarnings("checkstyle:FieldDocComment")
class CairoShape
{
	public static var sourceTransform:Matrix3 = new Matrix3();

	public static function render(shape:DisplayObject, renderer:CairoRenderer):Void
	{
		if (!(shape._ : _Shape).__renderable) return;

		var alpha = (renderer._ : _CairoRenderer).__getAlpha((shape._ : _Shape).__worldAlpha);
		if (alpha <= 0) return;

		var graphics = (shape._ : _Shape).__graphics;

		if (graphics != null)
		{
			CairoGraphics.render(graphics, renderer);

			var width = (graphics._ : _Graphics).__width;
			var height = (graphics._ : _Graphics).__height;
			var cairo = renderer.cairo;

			if (cairo != null && (graphics._ : _Graphics).__visible && width >= 1 && height >= 1)
			{
				var transform = (graphics._ : _Graphics).__worldTransform;
				var scale9Grid = (shape._ : _Shape).__worldScale9Grid;

				(renderer._ : _CairoRenderer).__setBlendMode((shape._ : _Shape).__worldBlendMode);
				(renderer._ : _CairoRenderer).__pushMaskObject(shape);

				if (scale9Grid != null && transform.b == 0 && transform.c == 0)
				{
					var bounds = (graphics._ : _Graphics).__bounds;

					var renderTransform = _Matrix.__pool.get();

					var scaleX = (graphics._ : _Graphics).__renderTransform.a;
					var scaleY = (graphics._ : _Graphics).__renderTransform.d;
					var renderScaleX = transform.a;
					var renderScaleY = transform.d;

					var left = Math.round(scale9Grid.x * scaleX);
					var top = Math.round(scale9Grid.y * scaleY);
					var right = Math.round((bounds.right - scale9Grid.right) * scaleX);
					var bottom = Math.round((bounds.bottom - scale9Grid.bottom) * scaleY);
					var centerWidth = Math.round(scale9Grid.width * scaleX);
					var centerHeight = Math.round(scale9Grid.height * scaleY);

					var renderLeft = Math.round(scale9Grid.x * renderScaleX);
					var renderTop = Math.round(scale9Grid.y * renderScaleY);
					var renderRight = Math.round((bounds.right - scale9Grid.right) * renderScaleX);
					var renderBottom = Math.round((bounds.bottom - scale9Grid.bottom) * renderScaleY);
					var renderCenterWidth = Math.round(width * renderScaleX) - renderLeft - renderRight;
					var renderCenterHeight = Math.round(height * renderScaleY) - renderTop - renderBottom;

					var pattern = CairoPattern.createForSurface((graphics._ : _Graphics).__renderData.cairo.target);
					// TODO: Allow smoothing, even though it shows seams?
					pattern.filter = CairoFilter.NEAREST;
					// pattern.filter = (renderer._ : _CairoRenderer).__allowSmoothing ? CairoFilter.GOOD : CairoFilter.NEAREST;

					function drawImage(sx:Float, sy:Float, sWidth:Float, sHeight:Float, dx:Float, dy:Float, dWidth:Float, dHeight:Float):Void
					{
						renderTransform.a = (dWidth / sWidth);
						renderTransform.d = (dHeight / sHeight);
						renderTransform.tx = transform.tx + dx;
						renderTransform.ty = transform.ty + dy;

						renderer.applyMatrix(renderTransform, cairo);

						sourceTransform.tx = sx;
						sourceTransform.ty = sy;
						pattern.matrix = sourceTransform;
						cairo.source = pattern;

						cairo.save();

						cairo.newPath();
						cairo.rectangle(0, 0, sWidth, sHeight);
						cairo.clip();

						if (alpha == 1)
						{
							cairo.paint();
						}
						else
						{
							cairo.paintWithAlpha(alpha);
						}

						cairo.restore();
					}

					if (centerWidth != 0 && centerHeight != 0)
					{
						drawImage(0, 0, left, top, 0, 0, renderLeft, renderTop);
						drawImage(left, 0, centerWidth, top, renderLeft, 0, renderCenterWidth, renderTop);
						drawImage(left + centerWidth, 0, right, top, renderLeft + renderCenterWidth, 0, renderRight, renderTop);

						drawImage(0, top, left, centerHeight, 0, renderTop, renderLeft, renderCenterHeight);
						drawImage(left, top, centerWidth, centerHeight, renderLeft, renderTop, renderCenterWidth, renderCenterHeight);
						drawImage(left + centerWidth, top, right, centerHeight, renderLeft + renderCenterWidth, renderTop, renderRight, renderCenterHeight);

						drawImage(0, top + centerHeight, left, bottom, 0, renderTop + renderCenterHeight, renderLeft, renderBottom);
						drawImage(left, top + centerHeight, centerWidth, bottom, renderLeft, renderTop + renderCenterHeight, renderCenterWidth, renderBottom);
						drawImage(left + centerWidth, top + centerHeight, right, bottom, renderLeft + renderCenterWidth, renderTop + renderCenterHeight,
							renderRight, renderBottom);
					}
					else if (centerWidth == 0 && centerHeight != 0)
					{
						var renderWidth = renderLeft + renderCenterWidth + renderRight;

						drawImage(0, 0, width, top, 0, 0, renderWidth, renderTop);
						drawImage(0, top, width, centerHeight, 0, renderTop, renderWidth, renderCenterHeight);
						drawImage(0, top + centerHeight, width, bottom, 0, renderTop + renderCenterHeight, renderWidth, renderBottom);
					}
					else if (centerHeight == 0 && centerWidth != 0)
					{
						var renderHeight = renderTop + renderCenterHeight + renderBottom;

						drawImage(0, 0, left, height, 0, 0, renderLeft, renderHeight);
						drawImage(left, 0, centerWidth, height, renderLeft, 0, renderCenterWidth, renderHeight);
						drawImage(left + centerWidth, 0, right, height, renderLeft + renderCenterWidth, 0, renderRight, renderHeight);
					}

					_Matrix.__pool.release(renderTransform);
				}
				else
				{
					renderer.applyMatrix(transform, cairo);

					cairo.setSourceSurface((graphics._ : _Graphics).__renderData.cairo.target, 0, 0);

					if (alpha >= 1)
					{
						cairo.paint();
					}
					else
					{
						cairo.paintWithAlpha(alpha);
					}
				}

					(renderer._ : _CairoRenderer).__popMaskObject(shape);
			}
		}
	}
}
#end