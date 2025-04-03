import { QuestionForm } from "@/components/admin/questions/QuestionForm"

export default function NewQuestionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Yeni Soru Ekle</h1>
      <QuestionForm />
    </div>
  )
}

