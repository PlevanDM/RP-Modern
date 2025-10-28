import React from 'react';
import { AdminDashboard } from '../admin/AdminDashboard';
import { UserRoleManager } from './UserRoleManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

export const SuperadminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Superadmin Dashboard</h1>
        <Tabs defaultValue="admin">
            <TabsList>
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="roles">Roles</TabsTrigger>
            </TabsList>
            <TabsContent value="admin">
                <AdminDashboard />
            </TabsContent>
            <TabsContent value="roles">
                <UserRoleManager />
            </TabsContent>
        </Tabs>
    </div>
  );
};

export default SuperadminDashboard;
