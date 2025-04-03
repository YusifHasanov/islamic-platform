// In a real app, you would fetch the question data here
import { QuestionForm } from "@/components/admin/questions/QuestionForm"
import { BASE_URL } from "@/util/Const"

export default async function EditQuestionPage({ params }) {
  const { id } = await params
  const res = await fetch(`${BASE_URL}/questions/${id}`)
  const questionData = await res.json()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Soruyu Düzenle</h1>
      <QuestionForm initialData={questionData} />
    </div>
  )
}

