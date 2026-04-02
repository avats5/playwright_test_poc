SELECT
  sn_hcis_1_encounter.enc_id AS enc_id,
  sn_hcis_1_encounter.enc_id AS enc_id1,
  enc_id / 7 AS enc_id2,
  sn_hcis_1_encounter.enc_code AS enc_code,
  sn_hcis_1_encounter.enc_discharge_date AS enc_date_1,
  toDate(enc_discharge_date) AS enc_date_2,
  formatDateTime(enc_discharge_date, '%m/%Y') AS enc_date_3,
  toYear(enc_discharge_date) AS enc_date_4
FROM
  (
    select
      *
    from
      encounter
  ) as sn_hcis_1_encounter
ORDER BY
  sn_hcis_1_encounter.enc_id ASC nulls last,
  sn_hcis_1_encounter.enc_id ASC nulls last,
  enc_id / 7 ASC nulls last,
  sn_hcis_1_encounter.enc_code ASC nulls last,
  sn_hcis_1_encounter.enc_discharge_date ASC nulls last,
  toDate(enc_discharge_date) ASC nulls last,
  toYYYYMM(enc_discharge_date) ASC,
  toYear(enc_discharge_date) ASC nulls last