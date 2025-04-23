import React, { act, useState } from "react";
import { useNavigate } from "react-router"

const Header = ({ activeTab, handleTabClick }: {activeTab: string | null, handleTabClick: (tab: string) => void}) => {
    const navigate = useNavigate();


    return (
        <div className="bg-white flex gap-4 md:gap-0 justify-between items-end px-8 py-4 pb-0 border-b border-neutral-200 shadow-lg ">
            <h1 className="text-primary text-3xl md:text-5xl font-theme pb-4 text-nowrap">My Poll</h1>

            <div className="flex gap-4 md:gap-8 text-nowrap">
                <h2
                    className={`text-text2 font-semibold pb-4 border-b-2 ${
                        activeTab === "createPoll"
                            ? "border-primary border-b-4" 
                            : "border-transparent hover:border-primary"
                    } transition-all duration-300 cursor-pointer`}
                    onClick={() => { handleTabClick("createPoll"); navigate("/criar")}}
                >
                    Criar enquete
                </h2>
                <h2
                    className={`text-text2 font-semibold pb-4 border-b-2 ${
                        activeTab === "polls"
                            ? "border-primary border-b-4"
                            : "border-transparent hover:border-primary"
                    } transition-all duration-300 cursor-pointer`}
                    onClick={() => { handleTabClick("polls"); navigate("/enquetes")}}
                >
                    Enquetes
                </h2>
            </div>
        </div>
    );
};

export default Header;
