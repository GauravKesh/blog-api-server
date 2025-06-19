import Link from "next/link";
import {
  PenTool,
  BookOpen,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <>
      {" "}
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  Stories
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/blogs"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Browse
              </Link>
               <Link
                href="/create-post"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Join Now
              </Link>
              {/* <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link> */}
              {/* <Button variant="outline" size="sm">
                Sign In
              </Button> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
