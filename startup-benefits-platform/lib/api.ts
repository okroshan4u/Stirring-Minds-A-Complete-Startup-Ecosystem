// import { Deal, ClaimedDeal, User, ApiResponse, ClaimStatus } from '@/types';

// // Mock API delay to simulate real network requests
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// // Mock data
// export const mockDeals: Deal[] = [
//   {
//     id: 'deal-1',
//     title: 'AWS Activate Credits',
//     description: 'Get up to $100,000 in AWS credits to build and scale your infrastructure',
//     partner: {
//       id: 'aws',
//       name: 'Amazon Web Services',
//       logo: 'https://placehold.co/100/FF9900/FFFFFF?text=AWS',
//       description: 'Cloud computing services',
//       website: 'https://aws.amazon.com',
//     },
//     category: 'infrastructure',
//     accessLevel: 'public',
//     value: '$100,000 in credits',
//     savings: 'Worth $100k',
//     eligibility: {
//       maxAge: 24,
//       requirements: ['Funded startup', 'Less than 2 years old'],
//     },
//     features: [
//       'EC2, S3, Lambda, and more',
//       'Technical support included',
//       'Valid for 2 years',
//       '24/7 customer support',
//     ],
//     claimedCount: 1247,
//     validUntil: '2026-12-31',
//     featured: true,
//   },
//   {
//     id: 'deal-2',
//     title: 'Stripe Atlas',
//     description: 'Incorporate your company, open a bank account, and get tax & legal support',
//     partner: {
//       id: 'stripe',
//       name: 'Stripe',
//       logo: 'https://placehold.co/100/635BFF/FFFFFF?text=Stripe',
//       description: 'Payment infrastructure',
//       website: 'https://stripe.com',
//     },
//     category: 'productivity',
//     accessLevel: 'premium',
//     value: '$500 off + waived fees',
//     savings: '100% off setup',
//     eligibility: {
//       requirements: ['First-time founders', 'Early stage startup'],
//     },
//     features: [
//       'C-Corp or LLC formation',
//       'IRS tax ID (EIN)',
//       'Bank account setup',
//       'Legal templates included',
//     ],
//     claimedCount: 892,
//     featured: true,
//   },
//   {
//     id: 'deal-3',
//     title: 'Notion for Startups',
//     description: 'Free Notion Plus plan for your entire team, plus $1,000 in credits',
//     partner: {
//       id: 'notion',
//       name: 'Notion',
//       logo: 'https://placehold.co/100/000000/FFFFFF?text=Notion',
//       description: 'Connected workspace',
//       website: 'https://notion.so',
//     },
//     category: 'productivity',
//     accessLevel: 'public',
//     value: '$1,000 in credits',
//     savings: '6 months free',
//     eligibility: {
//       maxAge: 36,
//       minFunding: 0,
//     },
//     features: [
//       'Unlimited blocks',
//       'Unlimited team members',
//       'Advanced permissions',
//       'Priority support',
//     ],
//     claimedCount: 2156,
//     validUntil: '2026-06-30',
//   },
//   {
//     id: 'deal-4',
//     title: 'OpenAI API Credits',
//     description: 'Get $5,000 in OpenAI credits to power your AI applications',
//     partner: {
//       id: 'openai',
//       name: 'OpenAI',
//       logo: 'https://placehold.co/100/10A37F/FFFFFF?text=OpenAI',
//       description: 'AI research and deployment',
//       website: 'https://openai.com',
//     },
//     category: 'development',
//     accessLevel: 'locked',
//     value: '$5,000 in credits',
//     savings: '3 months free usage',
//     eligibility: {
//       maxAge: 18,
//       minFunding: 100000,
//       requirements: ['Incorporated company', 'AI-focused product'],
//     },
//     features: [
//       'GPT-4 access',
//       'DALL-E credits',
//       'Embeddings API',
//       'Fine-tuning support',
//     ],
//     claimedCount: 534,
//     featured: true,
//   },
//   {
//     id: 'deal-5',
//     title: 'Segment Startup Program',
//     description: 'Free Segment Team plan for 2 years, plus implementation support',
//     partner: {
//       id: 'segment',
//       name: 'Segment',
//       logo: 'https://placehold.co/100/52BD94/FFFFFF?text=Segment',
//       description: 'Customer data platform',
//       website: 'https://segment.com',
//     },
//     category: 'analytics',
//     accessLevel: 'public',
//     value: '$24,000 in credits',
//     savings: '2 years free',
//     eligibility: {
//       maxAge: 24,
//       requirements: ['Less than $5M raised', 'Early revenue stage'],
//     },
//     features: [
//       '10M API calls/month',
//       'Unlimited sources & destinations',
//       'Warehouses integration',
//       'Priority support',
//     ],
//     claimedCount: 678,
//   },
//   {
//     id: 'deal-6',
//     title: 'Vercel Pro Plan',
//     description: 'Free Vercel Pro plan for 1 year with unlimited bandwidth',
//     partner: {
//       id: 'vercel',
//       name: 'Vercel',
//       logo: 'https://placehold.co/100/000000/FFFFFF?text=Vercel',
//       description: 'Frontend cloud platform',
//       website: 'https://vercel.com',
//     },
//     category: 'infrastructure',
//     accessLevel: 'public',
//     value: '$240 value',
//     savings: '1 year free',
//     eligibility: {
//       maxAge: 36,
//     },
//     features: [
//       'Unlimited bandwidth',
//       'Advanced analytics',
//       'Password protection',
//       'Deployment protection',
//     ],
//     claimedCount: 1823,
//   },
//   {
//     id: 'deal-7',
//     title: 'Figma Professional',
//     description: 'Free Figma Professional plan for your design team',
//     partner: {
//       id: 'figma',
//       name: 'Figma',
//       logo: 'https://placehold.co/100/F24E1E/FFFFFF?text=Figma',
//       description: 'Collaborative design tool',
//       website: 'https://figma.com',
//     },
//     category: 'design',
//     accessLevel: 'premium',
//     value: '$180 per year',
//     savings: '1 year free',
//     eligibility: {
//       maxAge: 24,
//       requirements: ['Active product development', 'Design team of 2+'],
//     },
//     features: [
//       'Unlimited projects',
//       'Unlimited version history',
//       'Advanced prototyping',
//       'Team library',
//     ],
//     claimedCount: 945,
//   },
//   {
//     id: 'deal-8',
//     title: 'HubSpot for Startups',
//     description: 'Up to 90% off HubSpot software for the first year',
//     partner: {
//       id: 'hubspot',
//       name: 'HubSpot',
//       logo: 'https://placehold.co/100/FF7A59/FFFFFF?text=HubSpot',
//       description: 'CRM platform',
//       website: 'https://hubspot.com',
//     },
//     category: 'marketing',
//     accessLevel: 'locked',
//     value: 'Up to $100,000',
//     savings: '90% off',
//     eligibility: {
//       maxAge: 24,
//       minFunding: 50000,
//       requirements: ['Series A or earlier', 'Associated with accelerator'],
//     },
//     features: [
//       'Marketing Hub Professional',
//       'Sales Hub Professional',
//       'Service Hub Professional',
//       'Onboarding included',
//     ],
//     claimedCount: 412,
//   },
// ];

// export const mockUser: User = {
//   id: 'user-1',
//   email: 'founder@startup.com',
//   name: 'Alex Chen',
//   company: {
//     name: 'TechVenture',
//     founded: '2024-06-15',
//     funding: 500000,
//   },
//   accessLevel: 'premium',
// };

// let mockClaimedDeals: ClaimedDeal[] = [
//   {
//     id: 'claim-1',
//     deal: mockDeals[0],
//     claimedAt: '2026-01-15T10:30:00Z',
//     status: 'approved',
//     statusMessage: 'Your AWS credits are ready to use',
//     redeemedAt: '2026-01-15T10:30:00Z',
//     expiresAt: '2028-01-15T10:30:00Z',
//   },
//   {
//     id: 'claim-2',
//     deal: mockDeals[2],
//     claimedAt: '2026-01-20T14:20:00Z',
//     status: 'pending',
//     statusMessage: 'Under review by partner',
//   },
// ];

// // Mock API functions
// export const api = {
//   // Fetch all deals with optional filters
//   async getDeals(filters?: {
//     category?: string;
//     accessLevel?: string;
//     search?: string;
//   }): Promise<ApiResponse<Deal[]>> {
//     await delay(800);

//     let filtered = [...mockDeals];

//     if (filters?.category && filters.category !== 'all') {
//       filtered = filtered.filter(deal => deal.category === filters.category);
//     }

//     if (filters?.accessLevel && filters.accessLevel !== 'all') {
//       filtered = filtered.filter(deal => deal.accessLevel === filters.accessLevel);
//     }

//     if (filters?.search) {
//       const searchLower = filters.search.toLowerCase();
//       filtered = filtered.filter(deal => 
//         deal.title.toLowerCase().includes(searchLower) ||
//         deal.description.toLowerCase().includes(searchLower) ||
//         deal.partner.name.toLowerCase().includes(searchLower)
//       );
//     }

//     return {
//       data: filtered,
//       message: 'Deals fetched successfully',
//     };
//   },

//   // Fetch a single deal by ID
//   async getDeal(id: string): Promise<ApiResponse<Deal>> {
//     await delay(500);

//     const deal = mockDeals.find(d => d.id === id);

//     if (!deal) {
//       return {
//         data: {} as Deal,
//         error: 'Deal not found',
//       };
//     }

//     return {
//       data: deal,
//       message: 'Deal fetched successfully',
//     };
//   },

//   // Claim a deal
//   async claimDeal(dealId: string): Promise<ApiResponse<ClaimedDeal>> {
//     await delay(1500);

//     const deal = mockDeals.find(d => d.id === dealId);

//     if (!deal) {
//       return {
//         data: {} as ClaimedDeal,
//         error: 'Deal not found',
//       };
//     }

//     const newClaim: ClaimedDeal = {
//       id: `claim-${Date.now()}`,
//       deal,
//       claimedAt: new Date().toISOString(),
//       status: 'pending',
//       statusMessage: 'Your claim is being processed',
//     };

//     mockClaimedDeals.push(newClaim);

//     return {
//       data: newClaim,
//       message: 'Deal claimed successfully',
//     };
//   },

//   // Fetch user's claimed deals
//   async getClaimedDeals(): Promise<ApiResponse<ClaimedDeal[]>> {
//     await delay(600);

//     return {
//       data: [...mockClaimedDeals],
//       message: 'Claimed deals fetched successfully',
//     };
//   },

//   // Get current user
//   async getCurrentUser(): Promise<ApiResponse<User>> {
//     await delay(400);

//     return {
//       data: mockUser,
//       message: 'User fetched successfully',
//     };
//   },
// };

// // Utility functions
// export const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   }).format(date);
// };

// export const getCategoryColor = (category: string): string => {
//   const colors: Record<string, string> = {
//     infrastructure: 'bg-blue-100 text-blue-800 border-blue-200',
//     analytics: 'bg-green-100 text-green-800 border-green-200',
//     marketing: 'bg-pink-100 text-pink-800 border-pink-200',
//     development: 'bg-purple-100 text-purple-800 border-purple-200',
//     productivity: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     security: 'bg-red-100 text-red-800 border-red-200',
//     design: 'bg-indigo-100 text-indigo-800 border-indigo-200',
//     communication: 'bg-cyan-100 text-cyan-800 border-cyan-200',
//   };
//   return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
// };

// export const getStatusColor = (status: ClaimStatus): string => {
//   const colors: Record<ClaimStatus, string> = {
//     pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     approved: 'bg-green-100 text-green-800 border-green-200',
//     rejected: 'bg-red-100 text-red-800 border-red-200',
//   };
//   return colors[status];
// };

// export const cn = (...classes: (string | boolean | undefined)[]): string => {
//   return classes.filter(Boolean).join(' ');
// };


const API_URL = "http://localhost:5000/api"

export const api = {
  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    return res.json()
  },

  async register(data: any) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  async getDeals() {
    const res = await fetch(`${API_URL}/deals`)
    return res.json()
  },

  async getDeal(id: string) {
    const res = await fetch(`${API_URL}/deals/${id}`)
    return res.json()
  },

  async claimDeal(id: string) {
    const token = localStorage.getItem("sb_token")

    const res = await fetch(`${API_URL}/claims/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.json()
  },

  async getMyClaims() {
    const token = localStorage.getItem("sb_token")

    if (!token) {
      throw new Error("Not authenticated")
    }

    const res = await fetch(`${API_URL}/claims/my`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      throw new Error("Unauthorized")
    }

    return res.json()
  }

}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

export function getCategoryColor(category: string) {
  const map: any = {
    infrastructure: "bg-blue-100 text-blue-700",
    analytics: "bg-green-100 text-green-700",
    marketing: "bg-pink-100 text-pink-700",
    development: "bg-purple-100 text-purple-700",
    productivity: "bg-yellow-100 text-yellow-700",
    security: "bg-red-100 text-red-700",
    design: "bg-indigo-100 text-indigo-700",
    communication: "bg-cyan-100 text-cyan-700",
  }

  return map[category] || "bg-gray-100 text-gray-700"
}

export function getStatusColor(status: string) {
  const map: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  }

  return map[status] || "bg-gray-100 text-gray-700"
}



export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

