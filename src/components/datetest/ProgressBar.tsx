interface IProgressBarProps {
    step: number;
    total: number;
}

export default function ProgressBar({ step, total }: IProgressBarProps) {
    const percentage = (step / total) * 100;

    return (
        <div className="w-full h-3 bg-gray-200 rounded-full">
            <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }} />
        </div>
    );
}
