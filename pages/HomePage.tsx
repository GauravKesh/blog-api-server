import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PenTool, BookOpen, Users, Zap, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
    

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Join 10,000+ writers sharing their stories
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Write stories that
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              matter
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            A clean, distraction-free space for writers to create, publish, and connect with readers who care about great stories.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/create-post">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
                Start writing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/blogs">
              <Button size="lg" variant="ghost" className="text-gray-600 hover:text-gray-900 px-8 py-3 rounded-full">
                Read stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Active writers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Stories published</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Monthly readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to tell your story
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Focus on what matters: your words. We'll handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Distraction-free editor',
                icon: <PenTool className="w-6 h-6" />,
                desc: 'Write in a clean, minimal environment designed for focus and creativity.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Engaged community',
                icon: <Users className="w-6 h-6" />,
                desc: 'Connect with readers and writers who appreciate thoughtful content.',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Instant publishing',
                icon: <Zap className="w-6 h-6" />,
                desc: 'Share your stories with the world in seconds, not hours.',
                gradient: 'from-orange-500 to-red-500'
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <blockquote className="text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
            "Finally, a platform that gets out of the way and lets me focus on writing. The community here actually reads and engages with content."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              SL
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Sarah Lin</div>
              <div className="text-gray-600">Author, Tech Writer</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to share your story?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of writers who have found their voice and their audience.
          </p>
          <Link href="/create-post">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
              Start writing today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

    
    </div>
  );
}