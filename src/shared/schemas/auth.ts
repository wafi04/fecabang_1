export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/'/g, "''")
    .replace(/;/g, "") 
    .replace(/--/g, "") 
    .replace(/\/\*/g, "") 
    .replace(/\*\//g, "")
    .replace(/xp_/gi, "") 
    .replace(/sp_/gi, "") 
    .replace(/exec/gi, "") 
    .replace(/execute/gi, "")
    .replace(/select/gi, "") 
    .replace(/insert/gi, "") 
    .replace(/update/gi, "")
    .replace(/delete/gi, "")
    .replace(/drop/gi, "")
    .replace(/union/gi, "") 
    .replace(/script/gi, "")
    .trim();
};
export const escapeHtml = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}
