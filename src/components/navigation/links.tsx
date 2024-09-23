"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa";
import { Button, VariantLink } from "../ui/button";
import { getDictionary } from "@/locales/dictionaries";
import { Locale } from "@/locales/config";
import { User } from "next-auth";
import { nav } from "@/locales/routing";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport
} from "@/components/ui/navigation-menu";
import { ExtendedRights } from "@/auth/auth";

interface LinksProps {
    className?: string;
    locale: Locale;
    user?: User;
    onClick?: () => void;
    btnCn?: string;
}

const MobileLinks = ({ className, locale, user, ...itemProps }: LinksProps) => {
    const t = getDictionary(locale).navigation.sitemap;

    return (
        <nav className={className}>
            <VariantLink {...itemProps} variant="ghost" href={nav(locale, "/about")}>
                {t.about}
            </VariantLink>
            <VariantLink {...itemProps} variant="ghost" href={nav(locale, "/offer")}>
                {t.offer}
            </VariantLink>
            <VariantLink {...itemProps} variant="ghost" href={nav(locale, "/commitment")}>
                {t.commitment}
            </VariantLink>
            <VariantLink {...itemProps} variant="ghost" href={nav(locale, "/blog")}>
                {t.blog}
            </VariantLink>
            <VariantLink {...itemProps} variant="ghost" href={nav(locale, "/faq")}>
                FAQ
            </VariantLink>
            {user === undefined ? (
                <VariantLink {...itemProps} variant="ghost" href={nav(locale, "/auth/signin")}>
                    {t.login}
                </VariantLink>
            ) : (
                <VariantLink {...itemProps} variant="ghost" href={nav(locale, "/auth/signout")}>
                    {t.logout}
                </VariantLink>
            )}
            <VariantLink {...itemProps} href={nav(locale, "/contact")} btnCn="group rounded-none" className="flex items-center space-x-2" variant="default">
                <p>Contact</p>
                <FaArrowRight className="group-hover:animate-bounce-x" />
            </VariantLink>
        </nav>
    );
};

const DesktopLinks = ({ links }: { links: Link[] }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {links.map((link: Link, i: number) =>
                    "call2action" in link && link.call2action ? (
                        <Button asChild key={i} variant="call2action" className="rounded-none">
                            <NavigationMenuItem>
                                <Link href={link.href} legacyBehavior passHref>
                                    <NavigationMenuLink className="flex space-x-2 items-center group/buttoncontact">
                                        <p>{link.title}</p>
                                        <FaArrowRight className="group-hover/buttoncontact:animate-bounce-x" />
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </Button>
                    ) : "href" in link ? (
                        <NavigationMenuItem key={i}>
                            <Link href={link.href} legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{link.title}</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem key={i}>
                            <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid grid-cols-2 w-[400px] p-2">
                                    {link.links.map(({ title, href }, i) => (
                                        <ListItem key={i} title={title} href={href}>
                                            {/* {title} */}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    )
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

interface SingleLink {
    href: string;
    title: string;
    call2action?: boolean;
}
interface MultipleLink {
    title: string;
    links: SingleLink[];
}
type Link = SingleLink | MultipleLink;

export const Links = ({
    locale,
    user,
    onClick,
    btnCn,
    mobile
}: {
    mobile: boolean;
    locale: Locale;
    user?: ExtendedRights;
    onClick?: () => void;
    btnCn?: string;
}) => {
    const t = getDictionary(locale).navigation;
    const s = t.sitemap;

    var authLinks: SingleLink[] = [];
    if (user?.rights?.blogAdmin) {
        authLinks.push({ href: nav(locale, "/validate-blog"), title: t.admin.validate });
    }
    if (user?.rights?.blogAuthor) {
        authLinks.push({ href: nav(locale, "/new-blog"), title: t.admin.newblog });
        authLinks.push({ href: nav(locale, "/blog"), title: t.admin.edit });
    }
    if (user?.rights?.formAdmin) {
        authLinks.push({ href: nav(locale, "/form-submission"), title: t.admin.form });
    }
    if (user?.rights?.userAdmin) {
        authLinks.push({ href: nav(locale, "/users"), title: t.admin.users });
    }
    const logoutLink = { href: nav(locale, "/auth/signout"), title: s.logout };
    authLinks.push(logoutLink);

    const authLink: Link =
        typeof user === "undefined"
            ? { title: s.login, href: nav(locale, "/auth/signin") }
            : authLinks.length <= 1
            ? logoutLink
            : {
                  title: t.admin.account,
                  links: authLinks
              };

    const links: Link[] = [
        {
            title: s.about,
            links: [
                { href: nav(locale, "/"), title: s.home },
                { href: nav(locale, "/about"), title: s.whoarewe },
                { href: nav(locale, "/faq"), title: "FAQ" },
                { href: nav(locale, "/commitment"), title: s.commitment },
                { href: nav(locale, "/team"), title: s.team }
            ]
        },
        {
            title: s.partners,
            links: [
                { href: nav(locale, "/partners"), title: s.company_partners },
                { href: nav(locale, "/ieseg"), title: s.ieseg }
            ]
        },
        { href: nav(locale, "/offer"), title: s.offer },
        { href: nav(locale, "/blog"), title: s.blog },
        authLink,
        { href: nav(locale, "/contact"), title: s.contact_form, call2action: true }
    ] as const;

    if (mobile) {
        return <MobileLinks locale={locale} user={user} btnCn={btnCn} onClick={onClick} />;
    } else {
        return <DesktopLinks links={links} />;
    }
};
