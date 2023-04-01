import { NavLink, Outlet } from 'react-router-dom';
export default function PokedexLayout() {
    return (
        <div className="out">
            <div className="in">
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}