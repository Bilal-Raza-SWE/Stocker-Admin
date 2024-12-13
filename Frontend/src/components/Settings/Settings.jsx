import { useState } from 'react'
import Sidebar from '@/components/Dashboard/Sidebar'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Plug2, Upload } from 'lucide-react'

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState('/public')
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 h-lvh">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and system preferences</p>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="integrations">API Integrations</TabsTrigger>
            <TabsTrigger value="preferences">System Preferences</TabsTrigger>
            <TabsTrigger value="backup">Backup Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account settings and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-20 w-20 rounded-full border-dashed border-2 object-cover"
                  />
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('imageUpload').click()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload new picture
                    </Button>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                    <Button variant="ghost" size="sm" onClick={() => setProfileImage('/public')}>
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>API Integrations</CardTitle>
                <CardDescription>
                  Configure third-party API integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Plug2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Google Analytics</h3>
                      <p className="text-sm text-muted-foreground">
                        Navigate the Google Analytics interface and reports
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>
                  Customize your system settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <select id="language" className="w-full p-2 border rounded-md">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <select id="timezone" className="w-full p-2 border rounded-md">
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle>Backup Settings</CardTitle>
                <CardDescription>
                  Configure automatic backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Retention Period</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security protocols and authentication methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

