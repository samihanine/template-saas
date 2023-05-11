type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => (
  <div
    className={`mx-auto flex w-full max-w-4xl flex-col space-y-4 bg-white px-4 py-6 shadow sm:overflow-hidden sm:rounded-md sm:p-6 ${className}`}
  >
    {children}
  </div>
);
