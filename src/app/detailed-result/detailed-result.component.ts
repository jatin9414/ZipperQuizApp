import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { quiz } from "../models";

@Component({
  selector: "app-detailed-result",
  templateUrl: "./detailed-result.component.html",
  styleUrls: ["./detailed-result.component.css"],
})
export class DetailedResultComponent implements OnInit {
  quizAnsweredQueries: quiz[];
  finalScore: number = 0;
  constructor(private route: ActivatedRoute) {
    this.quizAnsweredQueries = JSON.parse(
      sessionStorage.getItem("quizResults")
    );
    this.quizAnsweredQueries.forEach((quiz) => {
      if (quiz.selectedAnswer) {
        quiz.selectedAnswer.toString().toLowerCase() ===
        quiz.answer.toString().toLowerCase()
          ? this.finalScore++
          : this.finalScore;
      }
    });
  }

  ngOnInit() {}
  ngOnDestroy(): void {
    sessionStorage.removeItem("quizResults");
  }
}
