import Image from 'next/image';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hello World</h1>
        <p>This is some text</p>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: '1rem',
              height: '2rem',
              backgroundColor: 'var(--lightAccent)',
            }}></div>
          <div
            style={{
              width: '1rem',
              height: '1.5rem',
              backgroundColor: 'var(--lightAccent)',
            }}></div>
          <div
            style={{
              width: '1rem',
              height: '3.5rem',
              backgroundColor: 'var(--lightAccent)',
            }}></div>
          <div
            style={{
              width: '1rem',
              height: '3rem',
              backgroundColor: 'var(--primary)',
            }}></div>
          <div
            style={{
              width: '1rem',
              height: '2rem',
              backgroundColor: 'var(--primary)',
            }}></div>
          <div
            style={{
              width: '1rem',
              height: '2.5rem',
              backgroundColor: 'var(--primary)',
            }}></div>
          <div
            style={{
              width: '1rem',
              height: '3rem',
              backgroundColor: 'var(--secondary)',
            }}></div>
          <div
            style={{
              width: '1rem',
              height: '1rem',
              backgroundColor: 'var(--secondary)',
            }}></div>
          <div
            style={{
              width: '1rem',
              height: '1.5rem',
              backgroundColor: 'var(--secondary)',
            }}></div>
        </div>
      </main>
    </div>
  );
}
