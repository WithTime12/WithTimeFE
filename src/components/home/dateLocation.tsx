import MainCard from '@/components/home/mainCard';

function DateLocation() {
    return (
        <MainCard>
            <div className="py-[28px] flex flex-col">
                <div className="text-xl font-bold text-[#616161] mb-6">WithTime에 등록된 데이트 장소 수</div>
                <div className="flex items-end gap-8 w-full justify-center">
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-default-gray-500 mb-1">230</span>
                        <div className="h-16 w-10 bg-default-gray-400 mb-2 flex items-start justify-center" />
                        <div className="text-default-gray-500 mt-1">2022</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-default-gray-500 mb-1">430</span>
                        <div className="h-24 w-10 bg-default-gray-400 mb-2 flex items-start justify-center" />
                        <div className="text-default-gray-500 mt-1">2023</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-default-gray-500 mb-1">830</span>
                        <div className="h-36 w-10 bg-default-gray-400 mb-2 flex items-start justify-center" />
                        <div className="text-default-gray-500 mt-1">2024</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-default-gray-500 mb-1">1,230</span>
                        <div className="h-48 w-10 bg-default-gray-400 mb-2 flex items-start justify-center" />
                        <div className="text-default-gray-500 mt-1">2025</div>
                    </div>
                </div>
            </div>
        </MainCard>
    );
}
export default DateLocation;
