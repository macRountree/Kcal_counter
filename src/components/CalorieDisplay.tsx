interface CalorieDisplayProps {
  calories: number;
  text: string;
}
export const CalorieDisplay = ({calories, text}: CalorieDisplayProps) => {
  return (
    <p
      className={`font-bold rounded-full grid grid-cols-1 gap-3 text-center  ${
        text === 'Burned'
          ? 'text-orange-500'
          : text === 'Consumed'
          ? 'text-indigo-500'
          : text === 'Balance' && calories < 0
          ? 'text-red-500'
          : 'text-green-500'
      }`}
    >
      <span className={`font-black text-6xl `}>{calories} </span>
      {text}
    </p>
  );
};
