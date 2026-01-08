import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Truck, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createShopifyCheckout } from "@/lib/checkout";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();

  const handlePlaceOrder = () => {
  console.log("Checkout button clicked");
  console.log("Cart items:", items);
  alert("Checkout button works. Shopify not connected yet.");
};


 

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <CartDrawer />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center py-16">
            <h1 className="font-display text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some awesome collectibles before checking out!</p>
            <Link to="/shop">
              <Button className="gradient-glow text-primary-foreground">
                Browse Collection
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Shipping Info */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Shipping Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      placeholder="First Name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-secondary text-foreground"
                    />
                    <input
                      placeholder="Last Name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-secondary text-foreground"
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-secondary text-foreground md:col-span-2"
                    />
                    <input
                      placeholder="Phone"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-secondary text-foreground md:col-span-2"
                    />
                    <input
                      placeholder="Address"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-secondary text-foreground md:col-span-2"
                    />
                    <input
                      placeholder="City"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-secondary text-foreground"
                    />
                    <input
                      placeholder="Postal Code"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-secondary text-foreground"
                    />
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </h2>
                  <div className="p-4 bg-secondary/50 rounded-lg border border-dashed border-primary/30 text-center">
                    <p className="text-muted-foreground">
                      Payment processing powered by Shopify.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      You'll be redirected to secure checkout.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                  <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                          <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                          <p className="text-primary font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-semibold">Total</span>
                    <span className="font-display text-2xl font-bold text-primary">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full gradient-glow text-primary-foreground font-semibold py-6"
                  >
                    Place Order
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
