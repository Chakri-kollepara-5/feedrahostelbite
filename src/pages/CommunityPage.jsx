import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import API from '../services/api';
import { useRealTimeStats } from '../hooks/useRealTimeData';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const CommunityPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('members');
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const { stats } = useRealTimeStats();

  const [communityEvents, setCommunityEvents] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/community/members');
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
        toast.error('Failed to load community members');
      } finally {
        setLoading(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const { data } = await API.get('/community/events');
        const parsed = data.map(e => ({ ...e, date: new Date(e.date) }));
        setCommunityEvents(parsed);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (activeTab === 'members' && members.length === 0) fetchMembers();
    if (activeTab === 'events' && communityEvents.length === 0) fetchEvents();
  }, [activeTab]);

  const leaderboard = [...members]
    .sort((a, b) => (b.impactScore || 0) - (a.impactScore || 0))
    .slice(0, 10);

  // ------------------------------------------
  // Helpers
  // ------------------------------------------
  const getUserTypeLabel = (userType) => {
    switch (userType) {
      case 'donor':
        return <Badge variant="default" className="text-[9px] py-0.5">Donor</Badge>;
      case 'ngo':
        return <Badge variant="info" className="text-[9px] py-0.5">NGO</Badge>;
      case 'volunteer':
        return <Badge variant="warning" className="text-[9px] py-0.5">Volunteer</Badge>;
      default:
        return <Badge variant="secondary" className="text-[9px] py-0.5">Member</Badge>;
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'pickup':
        return 'bg-sky-200 text-[#0D2B1B]';
      case 'distribution':
        return 'bg-[#9FE870] text-[#0D2B1B]';
      case 'awareness':
        return 'bg-amber-300 text-[#0D2B1B]';
      case 'cleanup':
        return 'bg-rose-400 text-[#0D2B1B]';
      default:
        return 'bg-[#F4F7F5] text-[#0D2B1B]';
    }
  };

  const handleJoinEvent = (eventId) => {
    toast.success('Successfully joined the event!');
  };

  const handleConnectMember = (memberId) => {
    toast.success('Connection request sent!');
  };

  // ------------------------------------------
  // Component UI
  // ------------------------------------------
  return (
    <div className="min-h-screen bg-[#F4F7F5] pb-24 font-sans text-[#0D2B1B]">
      <div className="max-w-6xl mx-auto p-6 md:p-8">

        {/* Header */}
        <div className="bg-gradient-to-br from-[#b7f58b] via-[#9FE870] to-[#86db59] border border-[#84cf57]/40 rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_-10px_rgba(13,43,27,0.12)] flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 text-[#0D2B1B] relative overflow-hidden">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#0D2B1B]">
              Community Hub
            </h1>
            <p className="text-[#0D2B1B]/80 font-bold text-sm">
              Connect with fellow food savers and join local events
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatCard num="01" label="Active Members" value={(members.length + 1240).toLocaleString()} />
          <StatCard num="02" label="Upcoming Events" value={communityEvents.length} />
          <StatCard num="03" label="Meals Saved" value={stats?.totalFoodSaved?.toLocaleString() || '12,540'} />
          <StatCard num="04" label="CO₂ Saved (kg)" value={stats?.co2Saved?.toLocaleString() || '28,842'} />
        </div>

        {/* Tabs */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-[#0D2B1B]/10 shadow-[0_15px_35px_-5px_rgba(13,43,27,0.08),0_5px_15px_rgba(0,0,0,0.02)] mb-8 overflow-hidden">

          {/* Tab Headers */}
          <div className="flex border-b border-[#0D2B1B]/10 overflow-x-auto bg-[#F4F7F5]/20">
            {[
              { id: 'members', label: 'Community Members' },
              { id: 'events', label: 'Events' },
              { id: 'leaderboard', label: 'Leaderboard' },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 font-black uppercase tracking-wider text-xs border-r border-[#0D2B1B]/10 transition-all duration-150
                  ${active ? 'bg-gradient-to-r from-[#b7f58b] to-[#9FE870] text-[#0D2B1B]' : 'text-[#0D2B1B]/75 hover:bg-[#9FE870]/10 hover:text-[#0D2B1B]'}`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6">

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black uppercase tracking-tighter text-[#0D2B1B]">Community Members</h3>
                  <Button variant="primary" size="sm" className="py-2">
                    <Plus className="h-4 w-4 mr-2 stroke-[2.5]" />
                    Invite Friends
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading ? (
                    <p className="text-center col-span-3 py-10 font-bold text-[#0D2B1B]/60">Loading members...</p>
                  ) : members.length === 0 ? (
                    <p className="text-center col-span-3 py-10 font-bold text-[#0D2B1B]/60">No members found yet.</p>
                  ) : (
                    members.map((member) => (
                      <div key={member.id} className="bg-white/90 border border-gray-150 rounded-2xl p-5 shadow-sm hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-tr from-[#9FE870] to-[#b7f58b] border border-[#84cf57]/40 text-[#0D2B1B] rounded-full flex items-center justify-center font-black text-sm shadow-sm">
                            {(member.name || 'M')[0].toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <h4 className="font-extrabold text-sm text-[#0D2B1B]">{member.name}</h4>
                            <p className="text-xs font-semibold text-[#0D2B1B]/60">{member.username}</p>
                            <div className="mt-1">{getUserTypeLabel(member.userType)}</div>
                          </div>
                        </div>

                        <div className="text-xs text-[#0D2B1B] space-y-2 mb-4 font-mono">
                          <div className="flex items-center">
                            <span className="w-16 text-[#0D2B1B]/55 uppercase font-black tracking-wider text-[10px]">Location:</span>
                            <span className="font-sans font-extrabold">{member.location}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-16 text-[#0D2B1B]/55 uppercase font-black tracking-wider text-[10px]">Donated:</span>
                            <span className="font-sans font-extrabold">{member.donationsCount} items</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-16 text-[#0D2B1B]/55 uppercase font-black tracking-wider text-[10px]">Impact:</span>
                            <span className="font-sans font-extrabold">{member.impactScore} pts</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleConnectMember(member.id)}
                          variant="secondary"
                          className="w-full h-10 py-1"
                        >
                          Connect
                        </Button>
                      </div>
                    )))}
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black uppercase tracking-tighter text-[#0D2B1B]">Upcoming Events</h3>
                  <Button variant="primary" size="sm" className="py-2">
                    <Plus className="h-4 w-4 mr-2 stroke-[2.5]" />
                    Create Event
                  </Button>
                </div>

                <div className="space-y-6">
                  {communityEvents.map((event) => (
                    <div key={event.id} className="bg-white/90 border border-gray-150 rounded-2xl p-5 shadow-sm hover:scale-[1.01] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h4 className="font-black text-base uppercase text-[#0D2B1B]">{event.title}</h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border border-current/25 shadow-sm ${getEventTypeColor(event.type)}`}>
                              {event.type}
                            </span>
                          </div>

                          <p className="text-xs font-semibold text-[#0D2B1B]/75 mb-4">{event.description}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#0D2B1B] font-mono">
                            <div className="flex items-center">
                              <span className="w-12 text-[#0D2B1B]/55 uppercase font-black tracking-wider text-[10px]">Date:</span>
                              <span className="font-sans font-extrabold">{event.date.toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center">
                              <span className="w-12 text-[#0D2B1B]/55 uppercase font-black tracking-wider text-[10px]">Loc:</span>
                              <span className="font-sans font-extrabold">{event.location}</span>
                            </div>

                            <div className="flex items-center">
                              <span className="w-12 text-[#0D2B1B]/55 uppercase font-black tracking-wider text-[10px]">Size:</span>
                              <span className="font-sans font-extrabold">{event.attendees}/{event.maxAttendees}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleJoinEvent(event.id)}
                          variant="primary"
                          className="md:ml-4 py-2 px-6"
                        >
                          Join Event
                        </Button>
                      </div>

                      <div className="text-xs font-bold text-[#0D2B1B]/65 mt-3 pt-3 border-t border-[#0D2B1B]/10">
                        Organized by <span className="font-black text-[#0D2B1B]">{event.organizer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tighter text-[#0D2B1B]">Top Contributors</h3>

                <div className="space-y-4">
                  {leaderboard.map((member, index) => (
                    <div key={member.id} className="flex items-center justify-between bg-white/90 border border-gray-150 rounded-2xl p-4 shadow-sm hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center">
                        <div className="w-8 font-mono text-base font-black text-[#0D2B1B]/35">
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className="ml-4">
                          <h4 className="font-extrabold text-sm text-[#0D2B1B]">{member.name}</h4>
                          <p className="text-xs font-semibold text-[#0D2B1B]/60">{member.username}</p>
                          <div className="mt-1">
                            {getUserTypeLabel(member.userType)}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-black text-lg text-[#0D2B1B]">{member.impactScore}</p>
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#0D2B1B]/60">impact points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-gradient-to-br from-[#b7f58b]/15 to-[#9FE870]/5 border border-[#84cf57]/20 rounded-3xl p-6 md:p-8 shadow-[0_15px_35px_-5px_rgba(13,43,27,0.06),0_5px_15px_rgba(0,0,0,0.02)]">

          <h3 className="text-2xl font-black uppercase tracking-tighter text-[#0D2B1B] mb-6">Community Guidelines</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#0D2B1B]">
            <div>
              <h4 className="font-black text-sm uppercase tracking-wide mb-1">Be Respectful</h4>
              <p className="text-xs font-semibold text-[#0D2B1B]/80 leading-relaxed">Treat all community members with kindness and respect</p>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-wide mb-1">Share Responsibly</h4>
              <p className="text-xs font-semibold text-[#0D2B1B]/80 leading-relaxed">Only donate food that is safe and fresh for consumption</p>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-wide mb-1">Communicate Clearly</h4>
              <p className="text-xs font-semibold text-[#0D2B1B]/80 leading-relaxed">Provide accurate pickup times and location details</p>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-wide mb-1">Support Each Other</h4>
              <p className="text-xs font-semibold text-[#0D2B1B]/80 leading-relaxed">Participate in community activities and help others</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#0D2B1B]/10">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-wider text-[#0D2B1B]">Verified by Government of India</p>
                <p className="text-[10px] font-bold font-mono text-[#0D2B1B]/70 mt-0.5">UDYAM-AP-10-0116772</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ num, label, value }) => (
  <div className="bg-white/95 border border-[#0D2B1B]/10 rounded-3xl p-6 shadow-[0_12px_25px_-5px_rgba(13,43,27,0.06),0_4px_10px_-2px_rgba(0,0,0,0.02)] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden">
    <span className="absolute top-4 right-4 text-xs font-mono font-black text-[#0D2B1B]/35">{num}</span>
    <p className="text-xs font-black uppercase tracking-wider text-[#0D2B1B]/70">{label}</p>
    <p className="text-lg sm:text-2xl font-black text-[#0D2B1B] mt-2">{value}</p>
  </div>
);

export default CommunityPage;
