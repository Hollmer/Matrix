interface OperationCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const OperationCard: React.FC<OperationCardProps> = ({ title, description, onClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg" onClick={onClick}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default OperationCard;