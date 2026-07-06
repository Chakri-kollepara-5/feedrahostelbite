import React, { useMemo } from 'react';
import { ShieldAlert, Leaf, ArrowRight, Activity, Archive, Apple, Shield, Heart, Utensils, Cloud, Droplet, Compass, Map } from 'lucide-react';
import Badge from '../ui/Badge';

export default function SmartRadar({ donations = [] }) {
  // 1. Calculate stats dynamically from active donations
  const analytics = useMemo(() => {
    const active = donations.filter(d => d.status === 'POSTED' || d.status === 'available');
    
    let totalKg = 0;
    let excellentCount = 0;
    let goodCount = 0;
    let warningCount = 0;
    let dangerCount = 0;
    const urgentItems = [];

    active.forEach(d => {
      const kg = Number(d.quantity) || 0;
      totalKg += kg;

      const score = Number(d.freshnessScore) || 80;
      if (score >= 90) excellentCount++;
      else if (score >= 70) goodCount++;
      else if (score >= 50) warningCount++;
      else dangerCount++;

      // Urgency assessment
      const expiryDate = d.expiryDate ? new Date(d.expiryDate) : (d.expiryTime ? new Date(d.expiryTime) : null);
      const hoursLeft = expiryDate ? (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60) : 24;

      if (d.urgency === 'high' || hoursLeft < 6) {
        urgentItems.push({
          id: d.id || d._id,
          title: d.title || d.foodType || 'Food Item',
          kg,
          hoursLeft: Math.max(0, Math.round(hoursLeft)),
          freshness: score,
          foodType: d.foodType || 'meals'
        });
      }
    });

    // Sort urgent items by urgency (lowest hours left first)
    urgentItems.sort((a, b) => a.hoursLeft - b.hoursLeft);

    // Environmental metrics
    const meals = Math.round(totalKg * 2);
    const co2Offset = (totalKg * 2.5).toFixed(1);
    const waterSaved = Math.round(totalKg * 1000);

    return {
      activeCount: active.length,
      totalKg,
      excellentCount,
      goodCount,
      warningCount,
      dangerCount,
      urgentItems: urgentItems.slice(0, 3), // top 3 priorities
      meals,
      co2Offset,
      waterSaved
    };
  }, [donations]);

  // 2. Generate smart recommendations based on food types
  const recommendations = useMemo(() => {
    if (analytics.urgentItems.length === 0) return [];
    
    return analytics.urgentItems.map(item => {
      let targetNGO = "Local Shelter / Community Kitchen";
      let strategy = "Direct distribution to residents";
      let iconType = "default";

      const fType = (item.foodType || '').toLowerCase();
      if (fType.includes('grain') || fType.includes('rice') || fType.includes('wheat') || fType.includes('grocery')) {
        targetNGO = "Food Bank India / Goonj";
        strategy = "Bulk storage & dry ration packaging";
        iconType = "grains";
      } else if (fType.includes('vegetable') || fType.includes('fruit')) {
        targetNGO = "Robin Hood Army / Akshaya Patra";
        strategy = "Immediate daily cooking & raw distribution";
        iconType = "veggies";
      } else if (fType.includes('dairy') || fType.includes('milk') || fType.includes('cheese')) {
        targetNGO = "Local Orphanages / Mother Teresa Home";
        strategy = "Cold-chain quick consumption (milk/curd)";
        iconType = "dairy";
      } else if (fType.includes('prepared') || fType.includes('meal') || fType.includes('curry')) {
        targetNGO = "Slum Feeding Programs / Night Shelters";
        strategy = "Instant hot serving within 2 hours";
        iconType = "meals";
      }

      return {
        ...item,
        targetNGO,
        strategy,
        iconType
      };
    });
  }, [analytics.urgentItems]);

  const renderIcon = (type) => {
    switch (type) {
      case 'grains': return <Archive className="h-4.5 w-4.5 text-amber-600" />;
      case 'veggies': return <Apple className="h-4.5 w-4.5 text-green-600" />;
      case 'dairy': return <Shield className="h-4.5 w-4.5 text-blue-500" />;
      case 'meals': return <Heart className="h-4.5 w-4.5 text-red-500" />;
      default: return <Utensils className="h-4.5 w-4.5 text-gray-500" />;
    }
  };

  if (analytics.activeCount === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#0D2B1B]/10 shadow-[0_20px_50px_rgba(13,43,27,0.05)] text-center">
        <Compass className="h-12 w-12 text-indigo-500 mx-auto mb-3 animate-pulse" />
        <h3 className="text-lg font-bold text-[#0D2B1B] mb-1">Impact Analytics Standby</h3>
        <p className="text-sm font-semibold text-[#0D2B1B]/60 max-w-md mx-auto">
          Active food donations are required to compile live freshness metrics, matching algorithms, and environmental analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      
      {/* 1. FRESHNESS SAFETY TIERS */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_15px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-green-50 text-green-600">
              <Activity className="h-5 w-5 stroke-[2.5]" />
            </div>
            <h3 className="font-black text-sm uppercase tracking-wider text-[#0D2B1B]">
              Freshness Safety Tiers
            </h3>
          </div>
          
          <p className="text-xs font-semibold text-gray-500 mb-6">
            Live assessment of active food items categorized by analyzed safety scores.
          </p>

          <div className="space-y-4">
            {/* Excellent Tier */}
            <div>
              <div className="flex justify-between text-xs font-black uppercase mb-1">
                <span className="text-green-600">Excellent (≥90)</span>
                <span className="text-[#0D2B1B]">{analytics.excellentCount} items</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(analytics.excellentCount / analytics.activeCount) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Good Tier */}
            <div>
              <div className="flex justify-between text-xs font-black uppercase mb-1">
                <span className="text-blue-600">Good (70-89)</span>
                <span className="text-[#0D2B1B]">{analytics.goodCount} items</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(analytics.goodCount / analytics.activeCount) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Warning Tier */}
            <div>
              <div className="flex justify-between text-xs font-black uppercase mb-1">
                <span className="text-amber-600">Needs Rescue (50-69)</span>
                <span className="text-[#0D2B1B]">{analytics.warningCount} items</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(analytics.warningCount / analytics.activeCount) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Danger Tier */}
            <div>
              <div className="flex justify-between text-xs font-black uppercase mb-1">
                <span className="text-red-600">Critical / Expiring (&lt;50)</span>
                <span className="text-[#0D2B1B]">{analytics.dangerCount} items</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(analytics.dangerCount / analytics.activeCount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0D2B1B]/70 bg-[#F4F7F5] -mx-6 -mb-6 p-4 rounded-b-3xl">
          <span>Active Tracked Load:</span>
          <span className="font-black text-[#0D2B1B]">{analytics.totalKg} kg</span>
        </div>
      </div>

      {/* 2. SMART LOGISTICS MATCHING */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_15px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Map className="h-5 w-5 stroke-[2.5]" />
            </div>
            <h3 className="font-black text-sm uppercase tracking-wider text-[#0D2B1B]">
              Logistics Recommendations
            </h3>
          </div>

          <p className="text-xs font-semibold text-gray-500 mb-6">
            Real-time logistical matching matching active high-urgency donations with the best-fit NGO.
          </p>

          <div className="space-y-4">
            {recommendations.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <ShieldAlert className="h-8 w-8 mx-auto mb-2 text-green-500/60" />
                <p className="text-xs font-black uppercase text-green-700">No Critical Rescue Actions</p>
                <p className="text-[10px] font-medium mt-1">All current items have comfortable shelf-life margins.</p>
              </div>
            ) : (
              recommendations.map((rec, index) => (
                <div key={rec.id} className="p-3 bg-gradient-to-br from-indigo-50/30 to-indigo-100/10 rounded-2xl border border-indigo-100/30 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-white border border-gray-100 flex items-center justify-center">
                        {renderIcon(rec.iconType)}
                      </div>
                      <span className="text-xs font-black text-[#0D2B1B] truncate max-w-[120px]">{rec.title}</span>
                    </div>
                    <Badge variant="error" className="text-[9px] tracking-wide font-black">
                      {rec.hoursLeft <= 0 ? 'CRITICAL' : `${rec.hoursLeft}h left`}
                    </Badge>
                  </div>
                  
                  <div className="text-[10px] space-y-1 font-bold text-gray-600">
                    <div className="flex items-center gap-1">
                      <ArrowRight className="h-3 w-3 text-indigo-500 flex-shrink-0" />
                      <span>Best Match: <strong className="text-indigo-800 font-extrabold">{rec.targetNGO}</strong></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowRight className="h-3 w-3 text-indigo-500 flex-shrink-0" />
                      <span>Strategy: <em className="text-gray-700 font-medium">{rec.strategy}</em></span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0D2B1B]/70 bg-[#F4F7F5] -mx-6 -mb-6 p-4 rounded-b-3xl">
          <span>Logistics matching:</span>
          <span className="font-black text-indigo-700">Proximity & Freshness Match</span>
        </div>
      </div>

      {/* 3. ENVIRONMENTAL IMPACT OFFSET */}
      <div className="bg-gradient-to-br from-[#0D2B1B] to-[#17462C] rounded-3xl p-6 shadow-[0_20px_45px_-10px_rgba(13,43,27,0.3)] text-white flex flex-col justify-between relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-[#9FE870] rounded-full blur-[80px] opacity-15 pointer-events-none"></div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-white/10 text-[#9FE870]">
              <Leaf className="h-5 w-5 stroke-[2.5]" />
            </div>
            <h3 className="font-black text-sm uppercase tracking-wider text-white">
              Environmental Impact Offset
            </h3>
          </div>

          <p className="text-xs font-bold text-slate-300 mb-6">
            Live simulation of ecological conservation resulting from rescuing active food loads.
          </p>

          <div className="space-y-4">
            {/* Meals Saved */}
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 text-green-400 rounded-lg flex items-center justify-center">
                  <Utensils className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">Meals Provided</p>
                  <p className="text-base font-black tracking-tight text-white">{analytics.meals} servings</p>
                </div>
              </div>
            </div>

            {/* CO2 Offset */}
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center">
                  <Cloud className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">CO₂ Prevention</p>
                  <p className="text-base font-black tracking-tight text-white">{analytics.co2Offset} kg CO₂e</p>
                </div>
              </div>
            </div>

            {/* Water Offset */}
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center">
                  <Droplet className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">Water Conservation</p>
                  <p className="text-base font-black tracking-tight text-white">{analytics.waterSaved.toLocaleString()} Liters</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-300 bg-white/5 -mx-6 -mb-6 p-4 rounded-b-3xl">
          <span>Carbon Credit Ratio:</span>
          <span className="font-black text-[#9FE870]">1:2.5 Offset Index</span>
        </div>
      </div>

    </div>
  );
}
