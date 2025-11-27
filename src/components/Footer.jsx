import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white mt-10 py-8 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Logo / App Name */}
        <div>
          <h2 className="text-2xl font-bold">Feedra-HostelBite</h2>
          <p className="text-sm mt-2 opacity-90">
            Smart meal booking & food donation platform for students and hostels.
          </p>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>

          <p className="flex items-center gap-2 mb-2">
            <Phone size={18} /> +91 88856 28836
          </p>

          <p className="flex items-center gap-2 mb-2">
            <Mail size={18} /> feedra985@gmail.com
          </p>

          <p className="flex items-center gap-2 mb-2">
            <MapPin size={18} /> Visakhapatnam, Andhra Pradesh, India
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            <li><a href="/hostelbite" className="hover:underline">Meals</a></li>
            <li><a href="https://feedra-jet.vercel.app/" target="_blank" className="hover:underline">Feedra</a></li>
            <li><a href="/settings" className="hover:underline">Settings</a></li>
          </ul>
        </div>

      </div>

      <div className="text-center text-sm mt-8 opacity-80">
        © {new Date().getFullYear()} feedra-HostelBite • All Rights Reserved
      </div>
    </footer>
  );
}
