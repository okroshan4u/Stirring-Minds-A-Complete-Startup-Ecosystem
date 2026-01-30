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

