import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PenTool, BookOpen, Users, Zap } from "lucide-react";
import HomePage from "@/pages/HomePage";

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
