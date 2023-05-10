interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  onClick: () => void;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="bg-white-500 p-2 mt-1 border border-black disabled:opacity-30 rounded disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
};
