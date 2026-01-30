export type User = {
  name: string
  email: string
  isPremium?: boolean
}

export function saveUser(user: User) {
  localStorage.setItem("sb_user", JSON.stringify(user))
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem("sb_user")
  return data ? JSON.parse(data) : null
}

export function logout() {
  localStorage.removeItem("sb_user")
}
