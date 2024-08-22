import { useEffect, useRef, useState } from "react";

interface ImageCapInsetThat {
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

export const ImageCapInset: React.FC = () => {
  const [isInitd, setIsInitd] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const that = useRef<ImageCapInsetThat>({}).current;
  const capInset = { top: 50, bottom: 50, left: 50, right: 50 };
  const imgUrl =
    "http://examples-1251000004.cos.ap-shanghai.myqcloud.com/sample.jpeg";

  useEffect(() => {
    const wrapRect = wrapRef.current?.getBoundingClientRect();
    const img = new Image();
    img.src = imgUrl;
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
        console.log(
          "查看自适应后的图片大小",
          calculateContainScale(
            { width: that.imgWidth, height: that.imgHeight },
            { width: that.wrapWidth, height: that.wrapHeight }
          )
        );
        setIsInitd(true);
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

  const calcXYScale = () => {
    const xScale =
      (that.wrapWidth! - (capInset.left + capInset.right) * that.imgScale!) /
      ((that.imgWidth! - capInset.left - capInset.right) * that.imgScale!);
    const yScale =
      ((that.wrapHeight! - (capInset.top + capInset.bottom)) * that.imgScale!) /
      ((that.imgHeight! - capInset.top - capInset.bottom) * that.imgScale!);

    return { xScale, yScale };
  };

  const { xScale, yScale } = calcXYScale();

  console.log("查看缩放值", xScale, yScale);

  return (
    <div style={{ width: 600, height: 300 }} ref={wrapRef}>
      {isInitd && (
        <svg
          width={600}
          height={300}
          style={{ width: "100%", height: "100%", border: "1px solid red" }}
        >
          <defs>
            <clipPath id="left-top">
              <rect
                x="0"
                y="0"
                width={Math.round(capInset.left * that.imgScale!)}
                height={that.imgHeight! * that.imgScale!}
              />
            </clipPath>
            <clipPath id="center-top">
              <rect
                // x={capInset.left * xScale}
                x={Math.round(capInset.left * that.imgScale!)}
                y="0"
                width={Math.round(
                  that.wrapWidth! -
                    (capInset.left + capInset.right) * that.imgScale!
                )}
                height={that.imgHeight}
              />
            </clipPath>
            <clipPath id="right-top">
              <rect
                x={Math.round(
                  that.wrapWidth! - capInset.right * that.imgScale!
                )}
                y="0"
                width={Math.round(capInset.right * that.imgScale!)}
                height={that.imgHeight}
              />
            </clipPath>
          </defs>
          {/* 左上 */}
          <image
            href={imgUrl}
            width={Math.round(that.imgWidth! * that.imgScale!)}
            height={that.imgHeight! * that.imgScale!}
            preserveAspectRatio="none"
            clipPath="url(#left-top)"
          />
          {/* 中上 */}
          <image
            href={imgUrl}
            // x={capInset.left * that.imgScale!}
            x="0"
            y="0"
            width={that.imgWidth! * xScale * that.imgScale!}
            height={that.imgHeight! * that.imgScale!}
            preserveAspectRatio="none"
            clipPath="url(#center-top)"
          />
          {/* 右上 */}
          <image
            x={that.wrapWidth! - that.imgWidth! * that.imgScale!}
            href={imgUrl}
            width={Math.round(that.imgWidth! * that.imgScale!)}
            height={that.imgHeight! * that.imgScale!}
            preserveAspectRatio="none"
            clipPath="url(#right-top)"
          />
        </svg>
      )}
    </div>
  );
};
