import { Package, Search, Clock, Plus, Truck, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">ShipFast</h1>
            </div>
            <Link href="/add-order">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Place Order
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Manage your shipments with ease</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Place Order Card */}
          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Place Order</CardTitle>
                  <CardDescription>Create a new shipment</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/add-order">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Start New Order</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Track Shipment Card */}
          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Track Shipment</CardTitle>
                  <CardDescription>Monitor your packages</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
              >
                Track Package
              </Button>
            </CardContent>
          </Card>

          {/* View History Card */}
          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer group md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <History className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">View History</CardTitle>
                  <CardDescription>See past shipments</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 bg-transparent">
                View All Orders
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-muted">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Package #SP-2024-001</p>
                  <p className="text-sm text-muted-foreground">Delivered to New York, NY</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    Delivered
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">In Transit</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">3</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">This Month</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">12</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Delivered</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">47</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
