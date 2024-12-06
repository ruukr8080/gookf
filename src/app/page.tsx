// app/page.tsx
import {Card} from "@/components/ui/card";

export default function Home() {
    return (<>
            <header className="absolute z-99 bg-temp_basic w-full h-1/4 flex">
                {/* Search 섹션 */}
                    <Card className="p-4 ">
                        <input
                            type="text"
                            placeholder="search tag"
                            className="w-full h-[30px] border border-[#d9d9d9] rounded px-3"
                        />
                    </Card>
            </header>
            {/*Left side */}
            <div className="w-1/5 fixed h-full bg-temp_basic">
                    {/* Create 섹션 */}
                    <div className="h-1/4 z-0 w-full bg-primary shadow-xl rounded-3xl">
                        <Card className="flex h-full flex-col gap-2 pt-5 m-auto w-2/5 ">
                                <input
                                    type="text"
                                    placeholder="제조사"
                                    className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3"
                                />
                                <input
                                    type="text"
                                    placeholder="품목"
                                    className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3"
                                />
                                <input
                                    type="text"
                                    placeholder="가격"
                                    className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3"
                                />
                                <input
                                    type="text"
                                    placeholder="물량"
                                    className="w-1/2 h-[30px] border border-[#d9d9d9] rounded px-3"
                                />
                                <button className="w-[150px] h-[30px] text-temp_font mb-1 font-bold">Create</button>
                        </Card>
                    </div>
                {/* Total */}
                <Card className="p-6">

                    <div
                        className="pt-5 align-center justify-center flex h-[200px] bg-temp_board shadow-xl rounded-2xl">
                        <div className="flex flex-col gap-2">
                            <div>
                                <span className="pr-2">supplied</span>
                                <input
                                    type="text"
                                    placeholder="quantity"
                                    className="w-3/5 h-[30px] border border-[#d9d9d9] rounded px-3"
                                />
                            </div>
                            <div>
                                <span className="pr-2">remaining</span>
                                <input
                                    type="text"
                                    placeholder="quantity"
                                    className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3"
                                />
                            </div>
                            <div>
                                <span className="pr-2">average</span>
                                <input
                                    type="text"
                                    placeholder="$"
                                    className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3"
                                />
                            </div>
                            <div>
                                <span className="pr-2">total</span>
                                <input
                                    type="text"
                                    placeholder="$"
                                    className="w-[184px] h-[30px] border border-[#d9d9d9] rounded px-3"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="border-2 text-sm m-4 mx-auto w-2/5 h-1/4 shadow-l bg-gray-100 bg-opacity-40 rounded-full">
                        <button className="w-1/2 h-full font-mono bg-green-800 bg-opacity-40 rounded-full">
                            hold
                        </button>
                        <button className="w-1/2 h-full font-mono rounded-full">
                            reserve
                        </button>
                    </div>

                </Card>

                {/* LOGS */}
                <div className="w-full ">
                    <Card className="w-full p-4">

                        <div className="h-[400px] bg-background shadow-xl">
                            <h2 className="text-temp_font font-bold mx-auto w-5 h-5 mb-2">logs</h2>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}