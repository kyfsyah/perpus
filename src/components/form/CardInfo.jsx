export default function CardInfo({ title, value, color }) {
  return (
    <div className={`${color} text-white p-5 rounded-lg shadow`}>
      <h2 className="text-3xl font-bold">{value}</h2>
      <p>{title}</p>
    </div>
  );
}
