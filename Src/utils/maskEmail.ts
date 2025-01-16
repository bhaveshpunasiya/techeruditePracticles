export const maskEmail = (email) => {
    if(email ){
      const [username, domain] = email.split('@');
      const maskedUsername = username.slice(0, 3) + '******';
      return `${maskedUsername}@${domain}`;
    }
  }