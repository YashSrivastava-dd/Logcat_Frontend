import React from 'react';
import styles from '../../css/Login.module.css';

const LoginSkeleton = () => {
  return (
    <div className={styles.loginContainer}>
      {/* Hero section skeleton */}
      <div className={styles.heroSection}>
        <div 
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
          }}
        />
      </div>

      {/* Form section skeleton */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          {/* Header skeleton */}
          <div className={styles.formHeader}>
            <div 
              style={{
                height: '2rem',
                width: '60%',
                margin: '0 auto 1rem',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
                borderRadius: '4px',
              }}
            />
            <div 
              style={{
                height: '1.5rem',
                width: '80%',
                margin: '0 auto',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
                borderRadius: '4px',
              }}
            />
          </div>

          {/* Form skeleton */}
          <div className={styles.form}>
            {/* Email input skeleton */}
            <div className={styles.inputGroup}>
              <div 
                style={{
                  height: '3.5rem',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite',
                  borderRadius: '12px',
                }}
              />
            </div>

            {/* Password input skeleton */}
            <div className={styles.inputGroup}>
              <div 
                style={{
                  height: '3.5rem',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite',
                  borderRadius: '12px',
                }}
              />
            </div>

            {/* Button skeleton */}
            <div 
              style={{
                height: '3.5rem',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
                borderRadius: '12px',
                marginTop: '1rem',
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginSkeleton;
