import { Rectangle, Sprite, Texture, TilingSprite } from 'pixi.js';
import { convertColorStringToTint } from '../../helpers/convertColor';
import { Border, BorderType, BorderTypeEnum } from '../../schemas';
import { colors } from '../../theme/colors';
import { dashedTextures } from '../dashedTextures';

export interface BorderLine {
  sprite: Sprite;
  rectangle: Rectangle;
}

export const borderLineWidth = 1;

function setTexture(sprite: Sprite | TilingSprite, horizontal: boolean, borderType?: BorderType): void {
  if (borderType === BorderTypeEnum.dashed) {
    sprite.texture = horizontal ? dashedTextures.dashedHorizontal : dashedTextures.dashedVertical;
  } else if (borderType === BorderTypeEnum.dotted) {
    sprite.texture = horizontal ? dashedTextures.dottedHorizontal : dashedTextures.dottedVertical;
  } else {
    sprite.texture = Texture.WHITE;
  }
}

export function drawBorder(options: {
  x: number;
  y: number;
  width: number;
  height: number;
  tint: number;
  alpha: number;
  getSprite: (tiling?: boolean) => Sprite;
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
  borderType?: BorderType;
}): BorderLine[] {
  const borderLines: BorderLine[] = [];
  const { borderType } = options;
  const lineWidth = borderType === BorderTypeEnum.line2 ? 2 : borderType === BorderTypeEnum.line3 ? 3 : 1;

  const tiling = borderType === BorderTypeEnum.dashed || borderType === BorderTypeEnum.dotted;
  const doubleDistance = borderType === BorderTypeEnum.double ? lineWidth * 2 : 0;

  if (options.top) {
    const top = options.getSprite(tiling);
    setTexture(top, true, borderType);
    top.tint = options.tint;
    top.alpha = options.alpha;
    top.width = options.width + lineWidth;
    top.height = lineWidth;
    top.position.set(options.x - lineWidth / 2, options.y - lineWidth / 2);

    if (doubleDistance) {
      const top = options.getSprite(tiling);
      setTexture(top, true, borderType);
      top.tint = options.tint;
      top.alpha = options.alpha;
      top.width = options.width + lineWidth - ((options.left ? 1 : 0) + (options.right ? 1 : 0)) * doubleDistance;
      top.height = lineWidth;
      top.position.set(
        options.x - lineWidth / 2 + (options.left ? doubleDistance : 0),
        options.y + doubleDistance - lineWidth / 2
      );
    }
  }

  if (options.bottom) {
    const bottom = options.getSprite(tiling);
    setTexture(bottom, true, borderType);
    bottom.tint = options.tint;
    bottom.alpha = options.alpha;
    const width = options.width + (options.right ? 0 : lineWidth);
    bottom.width = width;
    bottom.height = lineWidth;
    bottom.position.set(options.x - lineWidth / 2, options.y + options.height - lineWidth / 2);
    borderLines.push({
      sprite: bottom,
      rectangle: new Rectangle(bottom.x, bottom.y, width, lineWidth),
    });

    if (doubleDistance) {
      const bottom = options.getSprite(tiling);
      setTexture(bottom, true, borderType);
      bottom.tint = options.tint;
      bottom.alpha = options.alpha;
      const width = options.width + lineWidth - ((options.left ? 1 : 0) + (options.right ? 1 : 0)) * doubleDistance;
      bottom.width = width;
      bottom.height = lineWidth;
      bottom.position.set(
        options.x - lineWidth / 2 + (options.left ? doubleDistance : 0),
        options.y - doubleDistance + options.height - lineWidth / 2
      );
      borderLines.push({
        sprite: bottom,
        rectangle: new Rectangle(bottom.x, bottom.y, width, lineWidth),
      });
    }
  }

  if (options.left) {
    const left = options.getSprite(tiling);
    setTexture(left, false, borderType);
    left.tint = options.tint;
    left.alpha = options.alpha;
    left.width = lineWidth;
    const height = options.height + (options.top ? 0 : lineWidth) - (options.bottom ? lineWidth : 0);
    left.height = height;
    left.position.set(options.x - lineWidth / 2, options.y - lineWidth / 2 + (options.top ? lineWidth : 0));
    borderLines.push({
      sprite: left,
      rectangle: new Rectangle(left.x, left.y, lineWidth, height),
    });
    if (doubleDistance) {
      const left = options.getSprite(tiling);
      setTexture(left, false, borderType);
      left.tint = options.tint;
      left.alpha = options.alpha;
      left.width = lineWidth;
      const height = options.height + lineWidth - ((options.top ? 1 : 0) + (options.bottom ? 1 : 0)) * doubleDistance;
      left.height = height;
      left.position.set(
        options.x - lineWidth / 2 + doubleDistance,
        options.y - lineWidth / 2 + (options.top ? doubleDistance : 0)
      );
      borderLines.push({
        sprite: left,
        rectangle: new Rectangle(left.x, left.y, lineWidth, height),
      });
    }
  }

  if (options.right) {
    const right = options.getSprite(tiling);
    setTexture(right, false, borderType);
    right.tint = options.tint;
    right.alpha = options.alpha;
    right.width = lineWidth;
    const height = options.height + (options.top ? 0 : lineWidth);
    right.height = height;
    right.position.set(
      options.x + options.width - lineWidth / 2,
      options.y - lineWidth / 2 + (options.top ? lineWidth : 0)
    );
    borderLines.push({
      sprite: right,
      rectangle: new Rectangle(right.x, right.y, lineWidth, height),
    });

    if (doubleDistance) {
      const right = options.getSprite(tiling);
      setTexture(right, false, borderType);
      right.tint = options.tint;
      right.alpha = options.alpha;
      right.width = lineWidth;
      const height = options.height + lineWidth - ((options.top ? 1 : 0) + (options.bottom ? 1 : 0)) * doubleDistance;
      right.height = height;
      right.position.set(
        options.x + options.width - lineWidth / 2 - doubleDistance,
        options.y - lineWidth / 2 + (options.bottom ? doubleDistance : 0)
      );
      borderLines.push({
        sprite: right,
        rectangle: new Rectangle(right.x, right.y, lineWidth, height),
      });
    }
  }
  return borderLines;
}

export function drawLine(options: {
  x: number;
  y: number;
  width: number;
  height: number;
  alpha: number;
  tint: number;
  getSprite: (tiling?: boolean) => Sprite;
}): BorderLine {
  const line = options.getSprite(false);
  line.tint = options.tint;
  line.alpha = options.alpha;
  line.width = options.width;
  line.height = options.height;
  line.position.set(options.x, options.y);
  return {
    sprite: line,
    rectangle: new Rectangle(line.x, line.y, options.width, options.height),
  };
}

export function drawCellBorder(options: {
  position: Rectangle;
  border: Border;
  getSprite: (tiling?: boolean) => Sprite;
}): void {
  const { position, border, getSprite } = options;

  if (border.horizontal) {
    const borderType = border.horizontal.type;
    const lineWidth = borderType === BorderTypeEnum.line2 ? 2 : borderType === BorderTypeEnum.line3 ? 3 : 1;
    const tiling = borderType === BorderTypeEnum.dashed || borderType === BorderTypeEnum.dotted;
    const doubleDistance = borderType === BorderTypeEnum.double ? lineWidth * 2 : 0;

    const top = getSprite(tiling);
    setTexture(top, true, borderType);
    const color = border.horizontal.color
      ? convertColorStringToTint(border.horizontal.color)
      : colors.defaultBorderColor;
    top.tint = color;
    top.width = position.width + lineWidth;
    top.height = lineWidth;
    top.position.set(position.x - lineWidth / 2, position.y - lineWidth / 2);

    if (doubleDistance) {
      const top = getSprite(tiling);
      setTexture(top, true, borderType);
      top.tint = color;
      top.width = position.width + lineWidth; // todo - ((options.left ? 1 : 0) + (options.right ? 1 : 0)) * doubleDistance;
      top.height = lineWidth;
      top.position.set(
        position.x - lineWidth / 2, // todo + (options.left ? doubleDistance : 0),
        position.y + doubleDistance - lineWidth / 2
      );
    }
  }

  if (border.vertical) {
    const borderType = border.vertical.type;
    const lineWidth = borderType === BorderTypeEnum.line2 ? 2 : borderType === BorderTypeEnum.line3 ? 3 : 1;
    const tiling = borderType === BorderTypeEnum.dashed || borderType === BorderTypeEnum.dotted;
    const doubleDistance = borderType === BorderTypeEnum.double ? lineWidth * 2 : 0;

    const left = options.getSprite(tiling);
    setTexture(left, false, borderType);
    const color = border.vertical.color ? convertColorStringToTint(border.vertical.color) : colors.defaultBorderColor;
    left.tint = color;
    left.width = lineWidth;
    left.height = position.height + lineWidth;
    left.position.set(position.x - lineWidth / 2, position.y - lineWidth / 2);

    if (doubleDistance) {
      const left = options.getSprite(tiling);
      setTexture(left, false, borderType);
      left.tint = color;
      left.width = lineWidth;
      left.height = position.height + lineWidth; // todo - ((options.top ? 1 : 0) + (options.bottom ? 1 : 0)) * doubleDistance;
      left.position.set(
        position.x - lineWidth / 2 + doubleDistance,
        position.y - lineWidth / 2 // todo + (options.top ? doubleDistance : 0)
      );
    }
  }
}
