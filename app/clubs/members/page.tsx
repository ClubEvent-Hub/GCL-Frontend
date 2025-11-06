
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  Search,
  Filter,
  UserPlus,
  Mail,
  MoreVertical,
  Shield,
  UserMinus,
  Crown,
  Download,
  Upload
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Moderator' | 'Member';
  joinDate?: string;
  status?: 'Active' | 'Inactive';
  eventsAttended?: number;
  avatar: string;
  department: string;
}

export default function MembersManagementPage() {
    
  const [members, setMembers] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@university.edu',
      role: 'Admin',
      joinDate: '2024-01-15',
      status: 'Active',
      eventsAttended: 24,
      avatar: 'JS',
      department: 'Computer Science'
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily.j@university.edu',
      role: 'Moderator',
      joinDate: '2024-02-20',
      status: 'Active',
      eventsAttended: 18,
      avatar: 'EJ',
      department: 'Information Technology'
    },
    {
      id: '3',
      name: 'Michael Williams',
      email: 'mike.w@university.edu',
      role: 'Moderator',
      joinDate: '2024-02-28',
      status: 'Active',
      eventsAttended: 15,
      avatar: 'MW',
      department: 'Software Engineering'
    },
    {
      id: '4',
      name: 'Sarah Davis',
      email: 'sarah.d@university.edu',
      role: 'Member',
      joinDate: '2024-03-10',
      status: 'Active',
      eventsAttended: 12,
      avatar: 'SD',
      department: 'Computer Science'
    },
    {
      id: '5',
      name: 'James Brown',
      email: 'james.b@university.edu',
      role: 'Member',
      joinDate: '2024-03-15',
      status: 'Active',
      eventsAttended: 10,
      avatar: 'JB',
      department: 'Data Science'
    },
    {
      id: '6',
      name: 'Lisa Anderson',
      email: 'lisa.a@university.edu',
      role: 'Member',
      joinDate: '2024-04-05',
      status: 'Active',
      eventsAttended: 8,
      avatar: 'LA',
      department: 'Computer Science'
    },
    {
      id: '7',
      name: 'David Miller',
      email: 'david.m@university.edu',
      role: 'Member',
      joinDate: '2024-04-12',
      status: 'Inactive',
      eventsAttended: 3,
      avatar: 'DM',
      department: 'Information Technology'
    },
    {
      id: '8',
      name: 'Jessica Wilson',
      email: 'jessica.w@university.edu',
      role: 'Member',
      joinDate: '2024-05-01',
      status: 'Active',
      eventsAttended: 7,
      avatar: 'JW',
      department: 'Software Engineering'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberDialog, setShowMemberDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Filter members
  const filteredMembers = members.filter((member: Member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Stats
  const stats = {
    total: members.length,
    active: members.filter((m: Member) => m.status === 'Active').length,
    admins: members.filter((m: Member) => m.role === 'Admin').length,
    moderators: members.filter((m : Member)=> m.role === 'Moderator').length,
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-cyan-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    return colors[index % colors.length];
  };

  const handleChangeRole = (memberId: string, newRole: 'Admin' | 'Moderator' | 'Member') => {
    setMembers(members.map((m: Member) => 
      m.id === memberId ? { ...m, role: newRole } : m
    ));
    setShowMemberDialog(false);
  };

  const handleChangeStatus = (memberId: string, newStatus: 'Active' | 'Inactive') => {
    setMembers(members.map((m: Member) => 
      m.id === memberId ? { ...m, status: newStatus } : m
    ));
    setShowMemberDialog(false);
  };
                      const roleIcon = members.role === 'Moderator' ? <Shield className="w-3 h-3 mr-1" /> : null;


  const handleExportMembers = () => {
    const csv = [
      ['Name', 'Email', 'Role', 'Department', 'Join Date', 'Events Attended', 'Status'],
      ...members.map((m: Member )=> [
        m.name,
        m.email,
        m.role,
        m.department,
        m.joinDate,
        m.eventsAttended,
        m.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'members-export.csv';
    a.click();
  };
const buttonContent = (
  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
    Cancel
  </Button>
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/club">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Members Management
            </h1>
            <p className="text-gray-600 mt-1">Manage your club members and permissions</p>
          </div>
          <Button onClick={() => setShowAddDialog(true)} className="bg-cyan-600 hover:bg-cyan-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm opacity-90 mb-1">Total Members</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm opacity-90 mb-1">Active</p>
              <p className="text-3xl font-bold">{stats.active}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm opacity-90 mb-1">Admins</p>
              <p className="text-3xl font-bold">{stats.admins}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <p className="text-sm opacity-90 mb-1">Moderators</p>
              <p className="text-3xl font-bold">{stats.moderators}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or department..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-cyan-500"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full md:w-48 h-12 border-2">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Moderator">Moderator</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 h-12 border-2">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExportMembers} className="h-12">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Members Table */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl">
              Members ({filteredMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Member</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Department</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Role</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Join Date</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Events</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member: Member, index: number) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${getAvatarColor(index)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-700">{member.department}</p>
                      </td>
                      <td className="py-4 px-4">

<Badge className={`${getRoleBadgeColor(member.role)} border`}>

  {member.role === 'Admin' ? 'admin' : member.role === 'Moderator' ? 'moderator' : 'member'}
</Badge>
                      </td>
                      <td className="py-4 px-4">
                       <p className="text-sm text-gray-700">
  {new Date(Number(member.eventsAttended)).toLocaleDateString()}
</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm font-semibold text-gray-900">
                          {member.eventsAttended}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedMember(member);
                            setShowMemberDialog(true);
                          }}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No members found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Dialog open={showMemberDialog} onOpenChange={setShowMemberDialog}>
          <DialogContent className="max-w-md">
                <DialogTitle>Member Actions</DialogTitle>
                Manage {selectedMember?.name}s permissions and membership
            {selectedMember && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-12 h-12 ${getAvatarColor(0)} rounded-full flex items-center justify-center text-white font-bold`}>
                    {selectedMember.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedMember.name}</p>
                    <p className="text-sm text-gray-600">{selectedMember.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Change Role</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedMember.role === 'Admin' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => handleChangeRole(selectedMember.id, 'Admin')}
                    >
                      <Crown className="w-4 h-4 mr-1" />
                      Admin
                    </Button>
                    <Button
                      variant={selectedMember.role === 'Moderator' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => handleChangeRole(selectedMember.id, 'Moderator')}
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      Moderator
                    </Button>
                    <Button
                      variant={selectedMember.role === 'Member' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => handleChangeRole(selectedMember.id, 'Member')}
                    >
                      Member
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.location.href = `mailto:${selectedMember.email}`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                 
                   
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Member Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
                Invite a student to join your club
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Student Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="Member">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}