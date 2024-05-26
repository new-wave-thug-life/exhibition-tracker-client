import { Link } from "react-router-dom";

type NavProps = ReactDivProps;

export default function Nav({ className: _className, ...props }: NavProps) {
    const className = ["h-screen", "pt-8", _className].join(" ");
    const NavMenuList = [
        {
            title: "메인",
            items: [{ name: "메인 페이지", link: "/Main" }],
        },
        {
            title: "분석",
            items: [{ name: "전시장 분석", link: "/connect" }],
        },
        {
            title: "방문객 관리",
            items: [
                { name: "입장 현황", link: "/" },
                { name: "입장 관리", link: "/" },
            ],
        },
        {
            title: "매출 관리",
            items: [
                { name: "결제 현황", link: "/" },
                { name: "매출 통계", link: "/" },
            ],
        },
        {
            title: "기타",
            items: [
                { name: "정보", link: "/" },
                { name: "로그아웃", link: "/login" },
            ],
        },
    ];
    return (
        <nav className={className} {...props}>
            {NavMenuList.map((group, index) => (
                <div key={index} className="mx-2 text-center text-indigo-50">
                    <div className="flex items-center pt-6 text-left">
                        <div className="flex-grow h-px mx-3 bg-gray-100"></div>
                        <div className="">{group.title}</div>
                        <div className="flex-grow h-px mx-3 bg-gray-100"></div>
                    </div>
                    <div className="mt-3">
                        {group.items.map((item, index) => (
                            <Link to={item.link} key={index}>
                                <div className="flex items-center justify-center h-12 font-medium rounded-full hover:bg-indigo-900">{item.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    );
}
