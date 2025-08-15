type TGradeInfo = {
    name: string;
    point: number; // 해당 등급 시작 포인트
};

const gradeTable: TGradeInfo[] = [
    { name: 'FLIRT', point: 0 },
    { name: 'EXPLORER', point: 50 },
    { name: 'SEEKER', point: 150 },
    { name: 'NAVIGATOR', point: 300 },
    { name: 'JOURNEYMAN', point: 500 },
    { name: 'TRAILBLAZER', point: 800 },
    { name: 'TIMEKEEPER', point: 1200 },
    { name: 'ROMANTIC_NOMAD', point: 1700 },
    { name: 'MASTER_OF_MOMENTS', point: 2300 },
    { name: 'WITHTIME', point: 3000 },
];

export function getProgressToNextGrade(grade: string, currentPoint: number): number {
    const currentIndex = gradeTable.findIndex((g) => g.name === grade);
    if (currentIndex === -1) throw new Error(`Unknown grade: ${grade}`);

    if (currentIndex === gradeTable.length - 1) return 100;

    const startPoint = gradeTable[currentIndex].point;
    const nextPoint = gradeTable[currentIndex + 1].point;

    const progress = ((nextPoint - startPoint - currentPoint) / (nextPoint - startPoint)) * 100;
    return Math.max(0, Math.min(progress, 100));
}
