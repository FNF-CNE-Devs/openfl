// #if!flash
// import BitmapData from "../display/BitmapData";
// import DisplayObjectRenderer from "../display/DisplayObjectRenderer";
// import Shader from "../display/Shader";
// import ColorTransfrom from "../geom/ColorTransform";
// import Point from "../geom/Point";
// import Rectangle from "../geom/Rectangle";
// #if lime
// import lime._internal.graphics.ImageDataUtil;
// #else
// import openfl._internal.backend.lime_standalone.ImageDataUtil;
// #end

namespace openfl.filters
{
/**
	The DropShadowFilter class lets you add a drop shadow to display objects.
	The shadow algorithm is based on the same box filter that the blur filter
	uses. You have several options for the style of the drop shadow, including
	inner or outer shadow and knockout mode. You can apply the filter to any
	display object(that is, objects that inherit from the DisplayObject
	class), such as MovieClip, SimpleButton, TextField, and Video objects, as
	well as to BitmapData objects.

	The use of filters depends on the object to which you apply the
	filter:


	* To apply filters to display objects use the `filters`
	property(inherited from DisplayObject). Setting the `filters`
	property of an object does not modify the object, and you can remove the
	filter by clearing the `filters` property.
	* To apply filters to BitmapData objects, use the
	`BitmapData.applyFilter()` method. Calling
	`applyFilter()` on a BitmapData object takes the source
	BitmapData object and the filter object and generates a filtered image as a
	result.


	If you apply a filter to a display object, the value of the
	`cacheAsBitmap` property of the display object is set to
	`true`. If you clear all filters, the original value of
	`cacheAsBitmap` is restored.

	This filter supports Stage scaling. However, it does not support general
	scaling, rotation, and skewing. If the object itself is scaled(if
	`scaleX` and `scaleY` are set to a value other than
	1.0), the filter is not scaled. It is scaled only when the user zooms in on
	the Stage.

	A filter is not applied if the resulting image exceeds the maximum
	dimensions. In AIR 1.5 and Flash Player 10, the maximum is 8,191 pixels in
	width or height, and the total number of pixels cannot exceed 16,777,215
	pixels.(So, if an image is 8,191 pixels wide, it can only be 2,048 pixels
	high.) In Flash Player 9 and earlier and AIR 1.1 and earlier, the
	limitation is 2,880 pixels in height and 2,880 pixels in width. If, for
	example, you zoom in on a large movie clip with a filter applied, the
	filter is turned off if the resulting image exceeds the maximum
	dimensions.
**/
#if!openfl_debug
	@: fileXml('tags="haxe,release"')
	@: noDebug
#end
	@: access(openfl.filters.GlowFilter)
	@: access(openfl.geom.ColorTransform)
	@: access(openfl.geom.Point)
	@: access(openfl.geom.Rectangle)
	@: final class DropShadowFilter extends BitmapFilter
	{
		protected static __hideShader = new HideShader();

		/**
			The alpha transparency value for the shadow color. Valid values are 0.0 to
			1.0. For example, .25 sets a transparency value of 25%. The default value
			is 1.0.
		**/
		public alpha(get, set): number;

		/**
			The angle of the shadow. Valid values are 0 to 360 degrees(floating
			point). The default value is 45.
		**/
		public angle(get, set): number;

		/**
			The amount of horizontal blur. Valid values are 0 to 255.0(floating
			point). The default value is 4.0.
		**/
		public blurX(get, set): number;

		/**
			The amount of vertical blur. Valid values are 0 to 255.0(floating point).
			The default value is 4.0.
		**/
		public blurY(get, set): number;

		/**
			The color of the shadow. Valid values are in hexadecimal format
			_0xRRGGBB_. The default value is 0x000000.
		**/
		public color(get, set): number;

		/**
			The offset distance for the shadow, in pixels. The default value is 4.0
			(floating point).
		**/
		public distance(get, set): number;

		/**
			Indicates whether or not the object is hidden. The value `true`
			indicates that the object itself is not drawn; only the shadow is visible.
			The default is `false`(the object is shown).
		**/
		public hideObject(get, set): boolean;

		/**
			Indicates whether or not the shadow is an inner shadow. The value
			`true` indicates an inner shadow. The default is
			`false`, an outer shadow(a shadow around the outer edges of
			the object).
		**/
		public inner(get, set): boolean;

		/**
			Applies a knockout effect(`true`), which effectively makes the
			object's fill transparent and reveals the background color of the
			document. The default is `false`(no knockout).
		**/
		public knockout(get, set): boolean;

		/**
			The number of times to apply the filter. The default value is
			`BitmapFilterQuality.LOW`, which is equivalent to applying the
			filter once. The value `BitmapFilterQuality.MEDIUM` applies the
			filter twice; the value `BitmapFilterQuality.HIGH` applies it
			three times. Filters with lower values are rendered more quickly.

			For most applications, a quality value of low, medium, or high is
			sufficient. Although you can use additional numeric values up to 15 to
			achieve different effects, higher values are rendered more slowly. Instead
			of increasing the value of `quality`, you can often get a
			similar effect, and with faster rendering, by simply increasing the values
			of the `blurX` and `blurY` properties.
		**/
		public quality(get, set): number;

		/**
			The strength of the imprint or spread. The higher the value, the more
			color is imprinted and the stronger the contrast between the shadow and
			the background. Valid values are from 0 to 255.0. The default is 1.0.
		**/
		public strength(get, set): number;

		protected __alpha: number;
		protected __angle: number;
		protected __blurX: number;
		protected __blurY: number;
		protected __color: number;
		protected __distance: number;
		protected __hideObject: boolean;
		protected __horizontalPasses: number;
		protected __inner: boolean;
		protected __knockout: boolean;
		protected __offsetX: number;
		protected __offsetY: number;
		protected __quality: number;
		protected __strength: number;
		protected __verticalPasses: number;

		#if openfljs
		protected static __init__()
		{
			untyped Object.defineProperties(DropShadowFilter.prototype, {
				"alpha": { get: untyped __js__("function () { return this.get_alpha (); }"), set: untyped __js__("function (v) { return this.set_alpha (v); }") },
				"angle": { get: untyped __js__("function () { return this.get_angle (); }"), set: untyped __js__("function (v) { return this.set_angle (v); }") },
				"blurX": { get: untyped __js__("function () { return this.get_blurX (); }"), set: untyped __js__("function (v) { return this.set_blurX (v); }") },
				"blurY": { get: untyped __js__("function () { return this.get_blurY (); }"), set: untyped __js__("function (v) { return this.set_blurY (v); }") },
				"color": { get: untyped __js__("function () { return this.get_color (); }"), set: untyped __js__("function (v) { return this.set_color (v); }") },
				"distance": {
					get: untyped __js__("function () { return this.get_distance (); }"),
					set: untyped __js__("function (v) { return this.set_distance (v); }")
				},
				"hideObject": {
					get: untyped __js__("function () { return this.get_hideObject (); }"),
					set: untyped __js__("function (v) { return this.set_hideObject (v); }")
				},
				"inner": { get: untyped __js__("function () { return this.get_inner (); }"), set: untyped __js__("function (v) { return this.set_inner (v); }") },
				"knockout": {
					get: untyped __js__("function () { return this.get_knockout (); }"),
					set: untyped __js__("function (v) { return this.set_knockout (v); }")
				},
				"quality": {
					get: untyped __js__("function () { return this.get_quality (); }"),
					set: untyped __js__("function (v) { return this.set_quality (v); }")
				},
				"strength": {
					get: untyped __js__("function () { return this.get_strength (); }"),
					set: untyped __js__("function (v) { return this.set_strength (v); }")
				},
			});
		}
		#end

		/**
			Creates a new DropShadowFilter instance with the specified parameters.

			@param distance   Offset distance for the shadow, in pixels.
			@param angle      Angle of the shadow, 0 to 360 degrees(floating point).
			@param color      Color of the shadow, in hexadecimal format
							  _0xRRGGBB_. The default value is 0x000000.
			@param alpha      Alpha transparency value for the shadow color. Valid
							  values are 0.0 to 1.0. For example, .25 sets a
							  transparency value of 25%.
			@param blurX      Amount of horizontal blur. Valid values are 0 to 255.0
							 (floating point).
			@param blurY      Amount of vertical blur. Valid values are 0 to 255.0
							 (floating point).
			@param strength   The strength of the imprint or spread. The higher the
							  value, the more color is imprinted and the stronger the
							  contrast between the shadow and the background. Valid
							  values are 0 to 255.0.
			@param quality    The number of times to apply the filter. Use the
							  BitmapFilterQuality constants:

							   * `BitmapFilterQuality.LOW`
							   * `BitmapFilterQuality.MEDIUM`
							   * `BitmapFilterQuality.HIGH`


							  For more information about these values, see the
							  `quality` property description.
			@param inner      Indicates whether or not the shadow is an inner shadow.
							  A value of `true` specifies an inner shadow.
							  A value of `false` specifies an outer shadow
							 (a shadow around the outer edges of the object).
			@param knockout   Applies a knockout effect(`true`), which
							  effectively makes the object's fill transparent and
							  reveals the background color of the document.
			@param hideObject Indicates whether or not the object is hidden. A value
							  of `true` indicates that the object itself is
							  not drawn; only the shadow is visible.
		**/
		public constructor(distance: number = 4, angle: number = 45, color: number = 0, alpha: number = 1, blurX: number = 4, blurY: number = 4, strength: number = 1,
			quality: number = 1, inner: boolean = false, knockout: boolean = false, hideObject: boolean = false)
		{
			super();

			__offsetX = 0;
			__offsetY = 0;

			__distance = distance;
			__angle = angle;
			__color = color;
			__alpha = alpha;
			__blurX = blurX;
			__blurY = blurY;
			__strength = strength;
			__quality = quality;
			__inner = inner;
			__knockout = knockout;
			__hideObject = hideObject;

			__updateSize();

			__needSecondBitmapData = true;
			__preserveObject = true;
			__renderDirty = true;
		}

		publicclone(): BitmapFilter
		{
			return new DropShadowFilter(__distance, __angle, __color, __alpha, __blurX, __blurY, __strength, __quality, __inner, __knockout, __hideObject);
		}

		protected __applyFilter(bitmapData: BitmapData, sourceBitmapData: BitmapData, sourceRect: Rectangle,
			destPoint: Point): BitmapData
		{
		#if(lime || openfl_html5)
			// TODO: Support knockout, inner

			var r = (__color >> 16) & 0xFF;
			var g = (__color >> 8) & 0xFF;
			var b = __color & 0xFF;

			var point = new Point(destPoint.x + __offsetX, destPoint.y + __offsetY);

			var finalImage = ImageDataUtil.gaussianBlur(bitmapData.limeImage, sourceBitmapData.limeImage, sourceRect.__toLimeRectangle(), point.__toLimeVector2(),
				__blurX, __blurY, __quality, __strength);
			finalImage.colorTransform(finalImage.rect, new ColorTransform(0, 0, 0, __alpha, r, g, b, 0).__toLimeColorMatrix());

			if (finalImage == bitmapData.limeImage) return bitmapData;
		#end
			return sourceBitmapData;
		}

		protected __initShader(renderer: DisplayObjectRenderer, pass: number, sourceBitmapData: BitmapData): Shader
		{
		#if(!macro && openfl_gl)
			// Drop shadow is glow with an offset
			if (__inner && pass == 0)
			{
				return GlowFilter.__invertAlphaShader;
			}

			var blurPass = pass - (__inner ? 1 : 0);
			var numBlurPasses = __horizontalPasses + __verticalPasses;

			if (blurPass < numBlurPasses)
			{
				var shader = GlowFilter.__blurAlphaShader;
				if (blurPass < __horizontalPasses)
				{
					var scale = Math.pow(0.5, blurPass >> 1) * 0.5;
					shader.uRadius.value[0] = blurX * scale;
					shader.uRadius.value[1] = 0;
				}
				else
				{
					var scale = Math.pow(0.5, (blurPass - __horizontalPasses) >> 1) * 0.5;
					shader.uRadius.value[0] = 0;
					shader.uRadius.value[1] = blurY * scale;
				}
				shader.uColor.value[0] = ((color >> 16) & 0xFF) / 255;
				shader.uColor.value[1] = ((color >> 8) & 0xFF) / 255;
				shader.uColor.value[2] = (color & 0xFF) / 255;
				shader.uColor.value[3] = alpha;
				shader.uStrength.value[0] = blurPass == (numBlurPasses - 1) ? __strength : 1.0;
				return shader;
			}
			if (__inner)
			{
				if (__knockout || __hideObject)
				{
					var shader = GlowFilter.__innerCombineKnockoutShader;
					shader.sourceBitmap.input = sourceBitmapData;
					shader.offset.value[0] = __offsetX;
					shader.offset.value[1] = __offsetY;
					return shader;
				}
				var shader = GlowFilter.__innerCombineShader;
				shader.sourceBitmap.input = sourceBitmapData;
				shader.offset.value[0] = __offsetX;
				shader.offset.value[1] = __offsetY;
				return shader;
			}
			else
			{
				if (__knockout)
				{
					var shader = GlowFilter.__combineKnockoutShader;
					shader.sourceBitmap.input = sourceBitmapData;
					shader.offset.value[0] = __offsetX;
					shader.offset.value[1] = __offsetY;
					return shader;
				}
				else if (__hideObject)
				{
					var shader = __hideShader;
					shader.sourceBitmap.input = sourceBitmapData;
					shader.offset.value[0] = __offsetX;
					shader.offset.value[1] = __offsetY;
					return shader;
				}
				var shader = GlowFilter.__combineShader;
				shader.sourceBitmap.input = sourceBitmapData;
				shader.offset.value[0] = __offsetX;
				shader.offset.value[1] = __offsetY;
				return shader;
			}
		#else
			return null;
		#end
		}

		protected __updateSize(): void
		{
			__offsetX = Std.int(__distance * Math.cos(__angle * Math.PI / 180));
			__offsetY = Std.int(__distance * Math.sin(__angle * Math.PI / 180));
			__topExtension = Math.ceil((__offsetY < 0 ? -__offsetY : 0) + __blurY);
			__bottomExtension = Math.ceil((__offsetY > 0 ? __offsetY : 0) + __blurY);
			__leftExtension = Math.ceil((__offsetX < 0 ? -__offsetX : 0) + __blurX);
			__rightExtension = Math.ceil((__offsetX > 0 ? __offsetX : 0) + __blurX);
			__calculateNumShaderPasses();
		}

		protected __calculateNumShaderPasses(): void
		{
			__horizontalPasses = Math.round(__blurX * (__quality / 4)) + 1;
			__verticalPasses = Math.round(__blurY * (__quality / 4)) + 1;
			__numShaderPasses = __horizontalPasses + __verticalPasses + (__inner ? 2 : 1);
		}

		// Get & Set Methods
		public get alpha(): number
		{
			return __alpha;
		}

		public set alpha(value: number): number
		{
			if (value != __alpha) __renderDirty = true;
			return __alpha = value;
		}

		public get angle(): number
		{
			return __angle;
		}

		public set angle(value: number): number
		{
			if (value != __angle)
			{
				__angle = value;
				__renderDirty = true;
				__updateSize();
			}
			return value;
		}

		public get blurX(): number
		{
			return __blurX;
		}

		public set blurX(value: number): number
		{
			if (value != __blurX)
			{
				__blurX = value;
				__renderDirty = true;
				__updateSize();
			}
			return value;
		}

		public get blurY(): number
		{
			return __blurY;
		}

		public set blurY(value: number): number
		{
			if (value != __blurY)
			{
				__blurY = value;
				__renderDirty = true;
				__updateSize();
			}
			return value;
		}

		public get color(): number
		{
			return __color;
		}

		public set color(value: number): number
		{
			if (value != __color) __renderDirty = true;
			return __color = value;
		}

		public get distance(): number
		{
			return __distance;
		}

		public set distance(value: number): number
		{
			if (value != __distance)
			{
				__distance = value;
				__renderDirty = true;
				__updateSize();
			}
			return value;
		}

		public get hideObject(): boolean
		{
			return __hideObject;
		}

		public set hideObject(value: boolean): boolean
		{
			if (value != __hideObject)
			{
				__renderDirty = true;
			}
			return __hideObject = value;
		}

		public get inner(): boolean
		{
			return __inner;
		}

		public set inner(value: boolean): boolean
		{
			if (value != __inner) __renderDirty = true;
			return __inner = value;
		}

		public get knockout(): boolean
		{
			return __knockout;
		}

		public set knockout(value: boolean): boolean
		{
			if (value != __knockout) __renderDirty = true;
			return __knockout = value;
		}

		public get quality(): number
		{
			return __quality;
		}

		public set quality(value: number): number
		{
			if (value != __quality) __renderDirty = true;
			return __quality = value;
		}

		public get strength(): number
		{
			return __strength;
		}

		public set strength(value: number): number
		{
			if (value != __strength) __renderDirty = true;
			return __strength = value;
		}
	}

#if!openfl_debug
	@: fileXml('tags="haxe,release"')
	@: noDebug
#end
	private class HideShader extends BitmapFilterShader
	{
		@: glFragmentSource("
		uniform sampler2D openfl_Texture;
	uniform sampler2D sourceBitmap;
	varying vec4 textureCoords;

	void main(void) {
		gl_FragColor = texture2D(openfl_Texture, textureCoords.zw);
	}
	")
	@: glVertexSource("attribute vec4 openfl_Position;
		attribute vec2 openfl_TextureCoord;
	uniform mat4 openfl_Matrix;
	uniform vec2 openfl_TextureSize;
	uniform vec2 offset;
	varying vec4 textureCoords;

	void main(void) {
		gl_Position = openfl_Matrix * openfl_Position;
		textureCoords = vec4(openfl_TextureCoord, openfl_TextureCoord - offset / openfl_TextureSize);
	}
	")
public constructor()
	{
		super();
		#if(!macro && openfl_gl)
		offset.value = [0, 0];
		#end
	}
}
}

export default openfl.filters.DropShadowFilter;
