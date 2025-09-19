"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Package, Truck } from "lucide-react"
import { useOrders } from "../queries/order/order"
import { MobileHeader } from "@/components/app-header"
import { MobileFooter } from "@/components/app-footer"

export default function HomePage() {
  const { data: orders = [], isLoading, isError } = useOrders()

  const deliveredCount = orders.filter(
    (o: any) => o.status === "DELIVERED"
  ).length
  const inTransitCount = orders.filter(
    (o: any) => o.status === "IN_TRANSIT"
  ).length
  const thisMonthCount = orders.filter((o: any) => {
    const created = new Date(o.createdAt)
    const now = new Date()
    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    )
  }).length

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-20 md:pb-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome back!
          </h2>
          <p className="text-muted-foreground">
            Manage your shipments with ease
          </p>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Activity
          </h3>
          <Card className="border-border">
            <CardContent className="p-6">
              {isLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : isError ? (
                <p className="text-red-500">Failed to load orders</p>
              ) : orders.length === 0 ? (
                <p className="text-muted-foreground">No recent activity</p>
              ) : (
                orders.slice(0, 3).map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 mb-4 last:mb-0"
                  >
                    <div className="p-2 rounded-lg bg-muted">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {order.packageDescription}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Delivered to {order.recipientAddress}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 text-green-800"
                            : order.status === "IN_TRANSIT"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  In Transit
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">
                {inTransitCount}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  This Month
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">
                {thisMonthCount}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Delivered</span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">
                {deliveredCount}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileFooter />
    </div>
  )
}
