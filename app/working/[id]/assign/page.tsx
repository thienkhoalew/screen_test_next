"use client";

import Header from "./header";
import ScheduleTable from "./schedule-table";
import DriverListSection from "./driver-list-section";
import FooterActions from "./footer-actions";

export default function AssignPage() {
    return (
        <div className="h-screen flex flex-col bg-[#FEF9F3] overflow-hidden">
            <div className="shrink-0">
                <Header />
            </div>
            <main className="flex-1 flex flex-col gap-2 min-h-0">
                <div className="flex-1 min-h-0 ">
                    <ScheduleTable />
                </div>
                <div className="h-[250px] shrink-0 min-h-0">
                    <DriverListSection className="h-full" />
                </div>
                <div className="shrink-0 mb-2">
                    <FooterActions />
                </div>
            </main>
        </div>
    );
}
