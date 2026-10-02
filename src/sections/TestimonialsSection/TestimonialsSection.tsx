import type { ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { Callout } from '../../components/ui/Callout/Callout';
import { SectionHeading } from '../../components/ui/SectionHeading/SectionHeading';
import { demonstrationTestimonials } from '../../content/testimonials';
import styles from './TestimonialsSection.module.css';

export function TestimonialsSection(): ReactElement {
  return (
    <Section id="depoimentos" labelledBy="depoimentos-titulo">
      <div className={styles.stack}>
        <SectionHeading
          id="depoimentos-titulo"
          eyebrow="Depoimentos"
          title="Espaço reservado para relatos reais"
          description="O layout abaixo mostra como os depoimentos entram na página. Nenhum deles é uma avaliação verdadeira."
        />
        <Callout>
          Conteúdo de demonstração. Substitua estes textos por relatos reais, com autorização de
          quem os escreveu, antes de publicar o site.
        </Callout>
        <div className={styles.grid}>
          {demonstrationTestimonials.map((item) => (
            <figure key={item.id} className={styles.card}>
              <figcaption>
                <span className={styles.badge}>Demonstração</span>
              </figcaption>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <span className={styles.author}>{item.author}</span>
                <span>{item.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
