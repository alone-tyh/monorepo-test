import React, { useEffect, useRef, useState } from "react";
import img_bg from "../../assets/t_horizontalversion_bg_card5@2x.png";

interface CanvasCapInsetThat {
  imgWidth?: number;
  imgHeight?: number;
  wrapWidth?: number;
  wrapHeight?: number;
  imgScale?: number;
}

interface Dimensions {
  width: number;
  height: number;
}

const DEFAULT_PROPS = {
  imgUrl: "http://examples-1251000004.cos.ap-shanghai.myqcloud.com/sample.jpeg",
  capInset: { top: 100, bottom: 100, left: 150, right: 150 },
};

type DrawImageParams = [
  number, // sx
  number, // sy
  number, // sWidth
  number, // sHeight
  number, // dx
  number, // dy
  number, // dWidth
  number // dHeight
];

export const CanvasCapInset: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const that = useRef<CanvasCapInsetThat>({}).current;
  const [isInitd, setIsInitd] = useState(false);

  useEffect(() => {
    const wrapRect = wrapRef.current?.getBoundingClientRect();
    const img = new Image();
    imgRef.current = img;
    // img.src = DEFAULT_PROPS.imgUrl;
    img.src = img_bg;
    img.onload = (e) => {
      console.log("查看图片大小", img.width, img.height);
      that.imgWidth = img.width;
      that.imgHeight = img.height;
      that.wrapWidth = wrapRect?.width;
      that.wrapHeight = wrapRect?.height;
      if (
        that.imgHeight &&
        that.imgWidth &&
        that.wrapWidth &&
        that.wrapHeight
      ) {
        that.imgScale = calculateContainScale(
          { width: that.imgWidth, height: that.imgHeight },
          { width: that.wrapWidth, height: that.wrapHeight }
        );
        drawImage();
      }
    };
  }, []);

  function calculateContainScale(
    imageSize: Dimensions,
    containerSize: Dimensions
  ): number {
    const widthScale = containerSize.width / imageSize.width;
    const heightScale = containerSize.height / imageSize.height;

    // The contain scale is the smaller of the two scales
    return Math.min(widthScale, heightScale);
  }

  const drawImage = () => {
    if (canvasRef.current) {
      canvasRef.current.width = that.wrapWidth!;
      canvasRef.current.height = that.wrapHeight!;
    }
    const ctx = canvasRef.current?.getContext("2d");
    const img = imgRef.current;
    const {
      imgScale = 0,
      imgWidth = 0,
      imgHeight = 0,
      wrapWidth = 0,
      wrapHeight = 0,
    } = that;
    const { capInset } = DEFAULT_PROPS;

    const drawImageParams: DrawImageParams[] = [
      // 左上
      [
        0,
        0,
        capInset.left,
        capInset.top,
        0,
        0,
        Math.round(capInset.left * imgScale),
        Math.round(capInset.top * imgScale),
      ],
      // 中上
      [
        capInset.left,
        0,
        imgWidth - capInset.left - capInset.right,
        capInset.top,
        Math.round(capInset.left * imgScale),
        0,
        Math.round(wrapWidth - (capInset.left + capInset.right) * imgScale),
        Math.round(capInset.top * imgScale),
      ],
      // 右上
      [
        imgWidth - capInset.right,
        0,
        capInset.right,
        capInset.top,
        Math.round(wrapWidth - capInset.right * imgScale),
        0,
        Math.round(capInset.right * imgScale),
        Math.round(capInset.top * imgScale),
      ],
      // 左中
      [
        0,
        capInset.top,
        capInset.left,
        imgHeight - capInset.top - capInset.bottom,
        0,
        Math.round(capInset.top * imgScale),
        Math.round(capInset.left * imgScale),
        Math.round(wrapHeight - (capInset.top + capInset.bottom) * imgScale),
      ],
      // 中中
      [
        capInset.left,
        capInset.top,
        imgWidth - capInset.left - capInset.right,
        imgHeight - capInset.top - capInset.bottom,
        Math.round(capInset.left * imgScale),
        Math.round(capInset.top * imgScale),
        Math.round(wrapWidth - (capInset.left + capInset.right) * imgScale),
        Math.round(wrapHeight - (capInset.top + capInset.bottom) * imgScale),
      ],
      // 右中
      [
        imgWidth - capInset.right,
        capInset.top,
        capInset.right,
        imgHeight - capInset.top - capInset.bottom,
        Math.round(wrapWidth - capInset.right * imgScale),
        Math.round(capInset.top * imgScale),
        Math.round(capInset.right * imgScale),
        Math.round(wrapHeight - (capInset.top + capInset.bottom) * imgScale),
      ],
      // 左下
      [
        0,
        imgHeight - capInset.bottom,
        capInset.left,
        capInset.bottom,
        0,
        Math.round(wrapHeight - capInset.bottom * imgScale),
        Math.round(capInset.left * imgScale),
        Math.round(capInset.bottom * imgScale),
      ],
      // 中下
      [
        capInset.left,
        imgHeight - capInset.bottom,
        imgWidth - capInset.left - capInset.right,
        capInset.bottom,
        Math.round(capInset.left * imgScale),
        Math.round(wrapHeight - capInset.bottom * imgScale),
        Math.round(wrapWidth - (capInset.left + capInset.right) * imgScale),
        Math.round(capInset.bottom * imgScale),
      ],
      // 右下
      [
        imgWidth - capInset.right,
        imgHeight - capInset.bottom,
        capInset.right,
        capInset.bottom,
        Math.round(wrapWidth - capInset.right * imgScale),
        Math.round(wrapHeight - capInset.bottom * imgScale),
        Math.round(capInset.right * imgScale),
        Math.round(capInset.bottom * imgScale),
      ],
    ];

    drawImageParams.forEach((item) => {
      ctx?.drawImage(img!, ...item);
    });
  };

  return (
    <div
      ref={wrapRef}
      style={{
        width: 500,
        height: 400,
        margin: "30px 30px",
        border: "1px solid red",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
