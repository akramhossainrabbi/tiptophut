import React from 'react';
import { useAppSettings } from '../../context/SettingsContext';

const BottomFooter = () => {
    const {generalSettings, loading, error} = useAppSettings();
    const currentYear = new Date().getFullYear();

    return (
        <div className="bottom-footer bg-color-one py-8">
            <div className="container container-lg">
                <div className="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
                    <p className="bottom-footer__text ">
                        {generalSettings?.company_name || "tiptophut.com"} © {currentYear}. All Rights Reserved{" "}
                    </p>
                    <div className="flex-align gap-8 flex-wrap">
                        {/* <span className="text-heading text-sm">We Are Acepting</span> */}
                        {/* <img src="assets/images/thumbs/payment-method.png" alt="" /> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BottomFooter