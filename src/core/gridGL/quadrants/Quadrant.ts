import { Container, Graphics, Matrix, MIPMAP_MODES, Rectangle, RenderTexture, Sprite } from 'pixi.js';
import { debugShowCacheInfo, debugShowQuadrantBoxes, debugShowSubCacheInfo, debugShowTime } from '../../../debugFlags';
import { PixiApp } from '../pixiApp/PixiApp';
import { Coordinate } from '../types/size';
import { QUADRANT_COLUMNS, QUADRANT_ROWS, QUADRANT_SCALE, QUADRANT_TEXTURE_SIZE } from './quadrantConstants';

// subquadrants are sprites that live within a quadrant mapped to a rendered texture size
interface SubQuadrant extends Sprite {
  subQuadrantX: number;
  subQuadrantY: number;
  texture: RenderTexture;
}

// A quadrant is a cached portion of the sheet mapped to column, row size (which can change based on heading size)
// at the default heading size, one subquadrant is needed per quadrant
export class Quadrant extends Container {
  private app: PixiApp;
  private subquadrants: SubQuadrant[];
  private _dirty = true;
  visibleRectangle!: Rectangle;
  location: Coordinate;

  private testGraphics: Graphics;

  constructor(app: PixiApp, quadrantX: number, quadrantY: number) {
    super();
    this.app = app;
    this.location = { x: quadrantX, y: quadrantY };
    this.subquadrants = [];
    this.testGraphics = this.addChild(new Graphics());
    this.reposition();
  }

  reposition() {
    const oldRectangle = this.visibleRectangle;
    const columnStart = this.location.x * QUADRANT_COLUMNS;
    const rowStart = this.location.y * QUADRANT_ROWS;
    this.visibleRectangle = this.app.sheet.gridOffsets.getScreenRectangle(
      columnStart,
      rowStart,
      QUADRANT_COLUMNS,
      QUADRANT_ROWS
    );

    // reposition subQuadrants based on any deltas
    if (oldRectangle) {
      const deltaX = this.visibleRectangle.x - oldRectangle.x;
      const deltaY = this.visibleRectangle.y - oldRectangle.y;
      if (deltaX || deltaY) {
        this.children.forEach((child) => {
          child.x += deltaX;
          child.y += deltaY;
        });
      }
    }
  }

  set dirty(value: boolean) {
    if (this._dirty !== value) {
      this._dirty = value;
      this.visible = !value;
    }
  }
  get dirty(): boolean {
    return this._dirty;
  }

  // creates/reuses a Sprite with an appropriately sized RenderTexture
  private getSubQuadrant(subQuadrantX: number, subQuadrantY: number, width: number, height: number): SubQuadrant {
    let sprite = this.subquadrants.find((child) => {
      const spriteQuadrant = child as SubQuadrant;
      if (spriteQuadrant.subQuadrantX === subQuadrantX && spriteQuadrant.subQuadrantY === subQuadrantY) {
        return true;
      }
      return false;
    }) as SubQuadrant;
    if (sprite) {
      // reuse existing sprite and resize texture if needed
      if (sprite.texture.width !== width || sprite.texture.height !== height) {
        sprite.texture.resize(width, height);
      }
      sprite.visible = true;
    } else {
      // create and position a Sprite with the appropriately sized RenderTexture
      const texture = RenderTexture.create({
        width,
        height,
        resolution: window.devicePixelRatio,
        mipmap: MIPMAP_MODES.ON,
      });
      sprite = this.addChild(new Sprite(texture)) as SubQuadrant;
      sprite.scale.set(1 / QUADRANT_SCALE);
      sprite.subQuadrantX = subQuadrantX;
      sprite.subQuadrantY = subQuadrantY;
      this.subquadrants.push(sprite);
    }
    return sprite;
  }

  private clear(): void {
    this.subquadrants.forEach((subquadrant) => (subquadrant.visible = false));
  }

  update(timeStart?: number, debug?: string): void {
    if (!this.dirty) return;
    this.clear();
    const app = this.app;
    const columnStart = this.location.x * QUADRANT_COLUMNS;
    const rowStart = this.location.y * QUADRANT_ROWS;
    const screenRectangle = app.sheet.gridOffsets.getScreenRectangle(
      columnStart,
      rowStart,
      QUADRANT_COLUMNS,
      QUADRANT_ROWS
    );

    if (debugShowQuadrantBoxes) {
      this.testGraphics
        .clear()
        .beginFill(Math.floor(Math.random() * 0xffffff), 0.25)
        .drawRect(screenRectangle.x, screenRectangle.y, screenRectangle.width, screenRectangle.height)
        .endFill();
    }
    // number of subquadrants necessary (should be equal to 1 unless heading size has changed)
    const xCount = Math.ceil(screenRectangle.width / QUADRANT_TEXTURE_SIZE);
    const yCount = Math.ceil(screenRectangle.height / QUADRANT_TEXTURE_SIZE);

    const subQuadrantWidth = screenRectangle.width / xCount;
    const subQuadrantHeight = screenRectangle.height / yCount;

    for (let subQuadrantY = 0; subQuadrantY < yCount; subQuadrantY++) {
      for (let subQuadrantX = 0; subQuadrantX < xCount; subQuadrantX++) {
        const cellBounds = new Rectangle(
          screenRectangle.x + subQuadrantX * subQuadrantWidth,
          screenRectangle.y + subQuadrantY * subQuadrantHeight,
          subQuadrantWidth,
          subQuadrantHeight
        );

        // draw quadrant and return the reduced subQuadrant rectangle (ie, shrinks the texture based on what was actually drawn)
        const reducedDrawingRectangle = app.cells.drawCells(cellBounds, true);

        if (reducedDrawingRectangle) {
          // prepare a transform to translate the world to the start of the content for this subQuadrant, and properly scale it
          const transform = new Matrix();
          transform.translate(-reducedDrawingRectangle.left, -reducedDrawingRectangle.top);
          transform.scale(QUADRANT_SCALE, QUADRANT_SCALE);

          // get the Sprite and resize the texture if needed
          // const textureWidth = subQuadrantWidth * QUADRANT_SCALE;
          // const textureHeight = subQuadrantHeight * QUADRANT_SCALE;

          // todo: the above is incorrect but ensures it works somewhat
          const textureWidth = Math.min(
            subQuadrantWidth * QUADRANT_SCALE,
            reducedDrawingRectangle.width * QUADRANT_SCALE
          );
          const textureHeight = Math.min(
            subQuadrantHeight * QUADRANT_SCALE,
            reducedDrawingRectangle.height * QUADRANT_SCALE
          );
          const subQuadrant = this.getSubQuadrant(subQuadrantX, subQuadrantY, textureWidth, textureHeight);

          if (debugShowSubCacheInfo) {
            console.log(
              `[Quadrant] ${this.debugName()}.[${subQuadrantX},${subQuadrantY}] [${cellBounds.toString()} texture size: (${textureWidth}, ${textureHeight})`
            );
          }

          // render the sprite's texture
          const container = app.prepareForQuadrantRendering();
          app.renderer.render(container, { renderTexture: subQuadrant.texture, transform, clear: true });
          app.cleanUpAfterQuadrantRendering();
          subQuadrant.position.set(reducedDrawingRectangle.left, reducedDrawingRectangle.top);

          if (debugShowQuadrantBoxes) {
            this.testGraphics
              .lineStyle({ color: 0, width: 5 })
              .drawRect(
                subQuadrantX * subQuadrantWidth + reducedDrawingRectangle.x,
                subQuadrantX * subQuadrantWidth + reducedDrawingRectangle.y,
                textureWidth / QUADRANT_SCALE,
                textureHeight / QUADRANT_SCALE
              );
          }
        }
      }
    }
    this.visibleRectangle = screenRectangle;

    if (debugShowTime && debugShowCacheInfo && timeStart) {
      console.log(`[Quadrant] Rendered ${this.debugName()} ${debug} (${Math.round(performance.now() - timeStart)} ms)`);
    }
    this.dirty = false;
  }

  debugName(): string {
    return `Q[${this.location.x},${this.location.y}]`;
  }

  debugTextureCount(): number {
    return this.children.reduce((count, child) => count + (child.visible ? 1 : 0), 0);
  }
}
