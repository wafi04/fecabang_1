import { dataNav } from "@/shared/data/navbarData";
import { WebSettings } from "@/shared/types/websettings";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  MessageCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

export function Footer({ data }: { data: WebSettings }) {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              {data.website_name || "MyBrand"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {data.website_description ||
                "Your business description goes here."}
            </p>

            {/* Social Media Links - kondisional berdasarkan show_social_links */}
            {data.show_social_links && (
              <div className="flex space-x-2 pt-2">
                {data.url_facebook && (
                  <Link
                    href={data.url_facebook}
                    className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                )}
                {data.url_twitter && (
                  <Link
                    href={data.url_twitter}
                    className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                )}
                {data.url_instagram && (
                  <Link
                    href={data.url_instagram}
                    className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                )}
                {data.url_youtube && (
                  <Link
                    href={data.url_youtube}
                    className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
                  >
                    <Youtube className="h-5 w-5" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {dataNav.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm group flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name.toUpperCase()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Games</h4>
            <ul className="space-y-2">
              {["mobile-legends", "free-fire", "genshin-impact"].map(
                (service) => (
                  <li key={service}>
                    <Link
                      href={`/order/${service}`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm group flex items-center"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {service.toUpperCase()}
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info - kondisional berdasarkan show_contact_info */}
          {data.show_contact_info && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                Contact Info
              </h4>
              <div className="space-y-3">
                {data.business_address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">
                      {data.business_address}
                    </p>
                  </div>
                )}

                {data.business_phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Link
                      href={`tel:${data.business_phone}`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {data.business_phone}
                    </Link>
                  </div>
                )}

                {data.business_email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Link
                      href={`mailto:${data.business_email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {data.business_email}
                    </Link>
                  </div>
                )}

                {data.business_hours && (
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">
                      {data.business_hours}
                    </p>
                  </div>
                )}

                {data.whatsapp_number && (
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Link
                      href={`https://wa.me/${data.whatsapp_number.replace(
                        /[^0-9]/g,
                        ""
                      )}${
                        data.whatsapp_message
                          ? `?text=${encodeURIComponent(data.whatsapp_message)}`
                          : ""
                      }`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {data.whatsapp_number}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-muted-foreground text-sm">
              {data.copyright_text ||
                `© ${new Date().getFullYear()} ${
                  data.website_name || "MyBrand"
                }. All rights reserved.`}
            </p>

            {data.footer_text && (
              <p className="text-muted-foreground text-sm">
                {data.footer_text}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
