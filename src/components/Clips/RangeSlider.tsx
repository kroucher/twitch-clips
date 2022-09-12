import { useEffect, useRef, useState } from "react";
import * as Slider from '@radix-ui/react-slider';

const RangeSlider = ({ rangeValue, setRangeValue }: { rangeValue: number[], setRangeValue: (value: number[]) => void }) => {



    const minThumbRef = useRef<HTMLElement>(null);
    const minTooltipRef = useRef<HTMLDivElement>(null);

    const maxThumbRef = useRef<HTMLElement>(null);
    const maxTooltipRef = useRef<HTMLDivElement>(null);

    const conjoinedTooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /* if none of the refs are defined, we just mounted, so don't do anything */
        if (!minThumbRef.current || !maxThumbRef.current || !minTooltipRef.current || !maxTooltipRef.current || !conjoinedTooltipRef.current) return;
        minTooltipRef.current.classList.remove("hidden");
        maxTooltipRef.current.classList.remove("hidden");

        /* calculate the tooltip position for the left thumb */
        const thumbBox = minThumbRef.current.getBoundingClientRect();
        const minTooltip = minTooltipRef.current?.style;
        /* I don't know the math, but I found 30% to be the perfect value to
           have the tooltip look centered */
        minTooltip.transform = `translate(
      calc(${thumbBox.x}px - 30%),
      calc(${thumbBox.y}px - 100%)
    )`;

        /* calculate the tooltip position for the right thumb */
        const maxThumbBox = maxThumbRef.current.getBoundingClientRect();
        const maxTooltip = maxTooltipRef.current.style;
        maxTooltip.transform = `translate(
      calc(${maxThumbBox.x}px - 30%),
      calc(${maxThumbBox.y}px - 100%)
    )`;

        const minTooltipBox = minTooltipRef.current.getBoundingClientRect();
        const maxTooltipBox = maxTooltipRef.current.getBoundingClientRect();
        /* check if the tooltips are "close enough" - 60 was a value I found through
           experimentation. We also use Math.abs here to handle the case where the
           right thumb moves to the left of the left thumb. */
        if (Math.abs(minTooltipBox.x - maxTooltipBox.x) < 65) {
            /* if the tooltips are close enough, we show the conjoined tooltip, 
               placing it at whichever tooltip is more to the left. */
            const conjoinedX = Math.min(minTooltipBox.x, maxTooltipBox.x);
            conjoinedTooltipRef.current.classList.remove("hidden");
            conjoinedTooltipRef.current.style.transform = `translate(
        calc(${conjoinedX}px),
        calc(${minTooltipBox.y}px)
      )`;
        } else {
            /* otherwise the tooltips are too far away, so hide the conjoined tooltip */
            conjoinedTooltipRef.current.classList.add("hidden")
            conjoinedTooltipRef.current.style.transform = ``;
        }
    }, [rangeValue]);
    return (
        <main className="h-10 flex items-center justify-center w-full max-w-md pb-8 px-3">
            <span className="whitespace-nowrap pr-1">0s</span>
            <Slider.Root
                className="relative flex items-center select-none touch-none w-96 "
                value={rangeValue}
                onValueChange={(val) => {
                    setRangeValue(val)
                    // hide both tooltips 3 seconds after the user has stopped dragging
                    // setTimeout(() => {
                    //     if (minTooltipRef.current && maxTooltipRef.current && conjoinedTooltipRef.current) {
                    //         minTooltipRef.current.classList.add("hidden");
                    //         maxTooltipRef.current.classList.add("hidden");
                    //     }
                    // }
                    //     , 2000);
                }}
                onMouseLeave={() => {
                    setTimeout(() => {
                        if (minTooltipRef.current && maxTooltipRef.current && conjoinedTooltipRef.current) {
                            minTooltipRef.current.classList.add("hidden");
                            maxTooltipRef.current.classList.add("hidden");
                        }
                    }, 2000);
                }}
                onTouchEnd={() => {
                    setTimeout(() => {
                        if (minTooltipRef.current && maxTooltipRef.current && conjoinedTooltipRef.current) {
                            minTooltipRef.current.classList.add("hidden");
                            maxTooltipRef.current.classList.add("hidden");
                        }
                    }, 2000);
                }}
                onMouseOver={() => {
                    if (minTooltipRef.current && maxTooltipRef.current && conjoinedTooltipRef.current) {
                        minTooltipRef.current.classList.remove("hidden");
                        maxTooltipRef.current.classList.remove("hidden");
                    }
                }}
                min={0}
                max={60}
            >
                <Slider.Track className="w-full bg-gray-600 relative flex-1 rounded-full h-2">
                    <Slider.Range className="absolute bg-slate-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-6 h-6 bg-slate-500 shadow rounded-[50%] cursor-grab" ref={minThumbRef} />
                <Slider.Thumb className="block w-6 h-6 bg-slate-500 shadow rounded-[50%] cursor-grab" ref={maxThumbRef} />
            </Slider.Root>
            <div className="fixed top-0 left-1" ref={minTooltipRef}>
                <div className="bg-white text-slate-900 p-2 rounded">{rangeValue[0]}s</div>
                <div className="bg-slate-500 w-3 h-3 -translate-y-1.5 rotate-45 m-auto" />
            </div>
            <div className="fixed top-0 left-0.5" ref={maxTooltipRef}>
                <div className="bg-white text-slate-900 p-2 rounded">{rangeValue[1]}s</div>
                <div className="bg-slate-500 w-3 h-3 -translate-y-1.5 rotate-45 m-auto" />
            </div>
            <div className="fixed top-0 left-0" ref={conjoinedTooltipRef} style={{ opacity: 0 }}>
                <div className="bg-white text-slate-900 p-2 rounded">
                    {rangeValue[0]}s — {rangeValue[1]}s
                </div>
            </div>
            <span className="whitespace-nowrap pl-1">60s</span>
        </main>
    );
}

export default RangeSlider;