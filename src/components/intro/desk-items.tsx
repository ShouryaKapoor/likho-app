"use client";

import { Laptop3D, Monitor3D, CoffeeMug3D, BookStack3D } from "./css-3d-objects";

export default function DeskItems() {
    return (
        <>
            {/* Monitor (Back Center) */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 z-0">
                <Monitor3D />
            </div>

            {/* Laptop (Front Center-Left) */}
            <div className="absolute bottom-20 left-[20%] transform rotate-6 z-10">
                <Laptop3D />
            </div>

            {/* Coffee Mug (Right) */}
            <div className="absolute bottom-32 right-[25%] transform -rotate-12 z-10">
                <CoffeeMug3D />
            </div>

            {/* Stack of Books (Far Left) */}
            <div className="absolute bottom-20 left-[5%] transform rotate-12 z-10">
                <BookStack3D />
            </div>
        </>
    );
}
