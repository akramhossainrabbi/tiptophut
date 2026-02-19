import React from 'react'
import { assetsURL, getColumnClass } from '../helper/helper';
import MenuElement from './MenuElement';
import useMenus from '../helper/useMenus';
import { Link } from 'react-router-dom';

export const CatagoryMenu = () => {
    const { menus, loading, error } = useMenus();
    const [activeIndexCat, setActiveIndexCat] = React.useState(null);

    const handleCatClick = (index) => {
        setActiveIndexCat(activeIndexCat === index ? null : index);
    };

    if (loading) return null;
    if (error) return null;
    const menuList = Array.isArray(menus.menus) ? menus.menus : [];
    if (menuList.length === 0) return null;

    return (
        <>
            {menuList.map((menu) => {
                if (menu.menu_type !== "multi_mega_menu") return null;
                return (
                    <React.Fragment key={menu.id}>
                        {menu.menus?.map((item) => {
                            const megaMenu = item.menu;
                            if (
                                megaMenu?.menu_type !== "mega_menu" ||
                                megaMenu?.status !== 1
                            )
                                return null;
                            return (
                                <li className={`has-submenus-submenu ${activeIndexCat === item.id ? "active" : ""
                                    }`} key={item.id} onClick={() => handleCatClick(item.id)}>
                                    <a href={`${assetsURL}product/category/1?with_products=${item.id}`} className='text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0'>
                                        <span className='text-xl d-flex'>
                                            <i className='ph ph-carrot' />
                                        </span>
                                        <span>{megaMenu.name?.en}</span>
                                        <span className='icon text-md d-flex ms-auto'>
                                            <i className='ph ph-caret-right' />
                                        </span>

                                    </a>
                                    {megaMenu?.columns?.length > 0 && (
                                    <div className="submenus-submenu py-16">

                                        <ul className='submenus-submenu__list max-h-300 overflow-y-auto scroll-sm'>
                                            {megaMenu?.columns.map((column) => (
                                                <li key={column.id}>
                                                    <Link to='/shop'>{column?.column?.en} </Link>
                                                    {column?.elements?.length > 0 && (
                                                        <div className="submenus-submenu py-16">
                                                            <ul className='submenus-submenu__list max-h-300 overflow-y-auto scroll-sm'>
                                                                {column.elements?.map((element) => (
                                                                    <li key={element.id}>
                                                                        <Link to='/shop'>{element?.title?.en}</Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    )}
                                </li>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </>
    );
};

