"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  RotateCcw,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

const questions = [
  {
    title: "What are you shopping for today?",
    options: [
      { label: "A calmer skincare routine", value: "skin" },
      { label: "An effortless makeup refresh", value: "makeup" },
      { label: "A fragrance that feels personal", value: "fragrance" },
    ],
  },
  {
    title: "Which feeling sounds best?",
    options: [
      { label: "Fresh and bright", value: "fresh" },
      { label: "Soft and comforting", value: "soft" },
      { label: "Expressive and confident", value: "bold" },
    ],
  },
  {
    title: "What matters most right now?",
    options: [
      { label: "Easy everyday use", value: "easy" },
      { label: "A premium treat", value: "premium" },
      { label: "A thoughtful gift", value: "gift" },
    ],
  },
];

const answerLabels = Object.fromEntries(
  questions.flatMap((question) => question.options.map((option) => [option.value, option.label])),
);

function getRecommendations(answers: string[]) {
  if (answers[0] === "fragrance") return [products[1], products[6], products[7]];
  if (answers[0] === "makeup") return [products[2], products[4], products[5]];
  if (answers.includes("gift")) return [products[7], products[1], products[2]];
  return [products[0], products[3], products[7]];
}

function getResultProfile(answers: string[]) {
  if (answers[0] === "fragrance") {
    return {
      title: "Your personal scent edit",
      summary: "Warm, wearable fragrance choices with one easy layering companion.",
    };
  }

  if (answers[0] === "makeup") {
    return {
      title: "Your effortless colour edit",
      summary: "Flexible colour, breathable coverage and one expressive finishing touch.",
    };
  }

  if (answers.includes("gift")) {
    return {
      title: "Your thoughtful gifting edit",
      summary: "Three polished, easy-to-enjoy choices with a premium but approachable feel.",
    };
  }

  return {
    title: "Your glow + calm edit",
    summary: "A simple three-step starting point designed for comfort, protection and radiance.",
  };
}

export function BeautyFinderClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const isComplete = step >= questions.length;
  const recommendations = getRecommendations(answers);
  const result = getResultProfile(answers);
  const whatsappMessage = encodeURIComponent(
    `Hello, I completed the Moris Beauty Finder and received “${result.title}”. I would like advice about ${recommendations
      .map((product) => product.name)
      .join(", ")}.`,
  );

  function choose(value: string) {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
    setStep((current) => current + 1);
  }

  function reset() {
    setStep(0);
    setAnswers([]);
  }

  return (
    <div className="finder-page">
      <Link className="back-link" href="/"><ArrowLeft size={16} /> Back home</Link>
      <div className="finder-progress" aria-label={`Step ${Math.min(step + 1, questions.length)} of ${questions.length}`}>
        {questions.map((_, index) => (
          <span className={index <= step ? "active" : ""} key={index} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.section
            className="finder-question"
            key={step}
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -22 }}
          >
            <span className="eyebrow">Question {step + 1} of {questions.length}</span>
            <h1>{questions[step].title}</h1>
            <div className="finder-options">
              {questions[step].options.map((option) => (
                <button onClick={() => choose(option.value)} key={option.value}>
                  <span>{option.label}</span>
                  <ArrowRight size={19} />
                </button>
              ))}
            </div>
            {step > 0 && (
              <button className="text-link button-reset" onClick={() => setStep((value) => value - 1)}>
                Go back
              </button>
            )}
          </motion.section>
        ) : (
          <motion.section
            className="finder-results"
            key="results"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="result-heading">
              <div className="result-icon"><Sparkles size={22} /></div>
              <div>
                <span className="eyebrow">Your beauty starting point</span>
                <h1>{result.title}</h1>
                <p>{result.summary}</p>
              </div>
              <div className="finder-answer-chips" aria-label="Your selected preferences">
                {answers.map((answer) => <span key={answer}>{answerLabels[answer]}</span>)}
              </div>
              <div className="finder-result-actions">
                <Link className="button button-dark" href={`/product/${recommendations[0].slug}`}>
                  View your top match <ShoppingBag size={16} />
                </Link>
                <a
                  className="button button-outline"
                  href={`https://wa.me/?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask on WhatsApp <MessageCircle size={16} />
                </a>
                <button className="text-link button-reset" onClick={reset}>
                  <RotateCcw size={15} /> Start again
                </button>
              </div>
              <small className="finder-disclaimer">
                Recommendations use transparent demo rules and are not medical advice.
              </small>
            </div>

            <div className="finder-products-heading">
              <span className="eyebrow">Three thoughtful matches</span>
              <p>Start with the first recommendation or compare the complete edit below.</p>
            </div>
            <div className="product-grid finder-product-grid">
              {recommendations.map((product) => <ProductCard product={product} key={product.id} />)}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
