import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { nav } from "@/locales/routing";
import { Locale } from "@/locales/config";
import { Dictionary } from "@/locales/dictionaries";

import Data from "@/../public/images/domains/icons/data.png";
import Cyber from "@/../public/images/domains/icons/cyber.png";
import Ima from "@/../public/images/domains/icons/image.png";
import Se from "@/../public/images/domains/icons/se.png";
import Market from "@/../public/images/domains/icons/market.png";
import Dev from "@/../public/images/domains/icons/dev.png";

export const DomainBlock = ({ t, locale }: { locale: Locale; t: Dictionary["pages"]["home"]["domains"] }) => (
    <>
        <h2 className="text-center">{t.title}</h2>
        <h3 className="text-center">{t.subtitle}</h3>
        <p className="text-center">{t.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 3xl:grid-cols-6 space-x-0 max-w-[2000px] m-auto">
            <DomainCard title={t.data} id="data" image={Data} locale={locale} />
            <DomainCard title={t.web} id="dev" image={Cyber} locale={locale} />
            <DomainCard title={t.cyber} id="cyber" image={Ima} locale={locale} />
            <DomainCard title={t.image} id="image" image={Se} locale={locale} />
            <DomainCard title={t.market} id="marrket" image={Market} locale={locale} />
            <DomainCard title={t.se} id="marrket" image={Dev} locale={locale} />
        </div>
    </>
);

const DomainCard = ({ title, id, image, locale }: { title: string; id: string; image: StaticImageData; locale: Locale }) => {
    return (
        <Link href={nav(locale, `/offer/${id}`)} className="p-4 w-full h-full">
            <Card className="hover:-translate-y-1 w-full h-full hover:scale-105 transition-all ease-out duration-500 grid grid-cols-2  bg-primary-accent hover:bg-primary-muted rounded-lg">
                <CardHeader>
                    <CardTitle className="text-center m-auto font-normal text-2xl text-">{title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 block">
                    <Image placeholder="blur" src={image} className="w-full h-full " alt={title} />
                </CardContent>
            </Card>
        </Link>
    );
};
