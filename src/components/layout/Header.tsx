type HeaderProps = ReactDivProps;
export default function Header({ className, ...props }: HeaderProps) {
    return (
        <div className={className} {...props}>
            <h1>헤더입니다</h1>
        </div>
    );
}
