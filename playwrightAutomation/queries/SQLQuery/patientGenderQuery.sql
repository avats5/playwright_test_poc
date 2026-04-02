SELECT
  sn_simple_tree.patientgender AS patientgender,
  COUNT(
    DISTINCT sn_simple_tree.patientid
  ) AS patientid
FROM
  (
    select
      patientid,
      coalesce(patientgender, 'ZZ(NULLVAL)') as patientgender,
      patientbirthdate,
      patientdeathdate,
      patientcitycode,
      patientcitydescr,
      patientage,
      patientagerange,
      patientagerangeorder,
      coalesce(patientprovcode, 'ZZ(NULLVAL)') as patientprovcode,
      visitid,
      visitcreationdate,
      coalesce(
        visitpatientclassdesc, 'ZZ(NULLVAL)'
      ) as visitpatientclassdesc,
      coalesce(
        visithospitaldescr, 'ZZ(NULLVAL)'
      ) as visithospitaldescr,
      coalesce(visitunitdescr, 'ZZ(NULLVAL)') as visitunitdescr,
      caseid,
      casecreationdate,
      caselastupdate,
      coalesce(casetypecode, 'ZZ(NULLVAL)') as casetypecode,
      casenumber,
      coalesce(casetypedescr, 'ZZ(NULLVAL)') as casetypedescr,
      coalesce(caselabcode, 'ZZ(NULLVAL)') as caselabcode,
      coalesce(caselabdescr, 'ZZ(NULLVAL)') as caselabdescr,
      casecomplete,
      coalesce(patol_sign, 'ZZ(NULLVAL)') as patol_sign,

      /* https://app.asana.com/0/0/1203286623402188/f */

      /* The following line is for demo purposes. 
      For production environments, change the following line to: 
      patol_sign as patol_sign_array
      */
      -- patol_sign_array_armonia  as patol_sign_array,
      patol_sign as patol_sign_array,
      patol_cosign as patol_cosign,
      coalesce(casepatassegn, 'ZZ(NULLVAL)') as casepatassegn,
      casepatlastasseg,
      coalesce(casepriority, 'ZZ(NULLVAL)') as casepriority,
      coalesce(casedocask, 'ZZ(NULLVAL)') as casedocask,
      coalesce(caserepask, 'ZZ(NULLVAL)') as caserepask,
      coalesce(caseplacermode, 'ZZ(NULLVAL)') as caseplacermode,
      coalesce(casedocexec, 'ZZ(NULLVAL)') as casedocexec,
      coalesce(caserepexec, 'ZZ(NULLVAL)') as caserepexec,
      coalesce(casereprich, 'ZZ(NULLVAL)') as casereprich,
      coalesce(casesysrich, 'ZZ(NULLVAL)') as casesysrich,
      casedigitsigndate,
      caseprintdate,
      casecompletiondate,
      coalesce(checkcode, 'ZZ(NULLVAL)') as checkcode,
      coalesce(checklocalcode, 'ZZ(NULLVAL)') as checklocalcode,
      checknumber,
      checkcreationdate,
      coalesce(checkdescr, 'ZZ(NULLVAL)') as checkdescr,
      coalesce(
        checkcode || ' - ' || checkdescr, 'ZZ(NULLVAL)'
      ) as check,
      coalesce(checkhospdescr, 'ZZ(NULLVAL)') as checkhospdescr,
      coalesce(
        checkunitaskdescr, 'ZZ(NULLVAL)'
      ) as checkunitaskdescr,
      coalesce(checklabdescr, 'ZZ(NULLVAL)') as checklabdescr,

      /* https://app.asana.com/0/0/1202322600796140/f */
      checkquantity,
      checknumberwithquantity,

      /**/
      anamid,
      anamcreationdate,
      specimenid,
      specimencreationdate,
      specimennumber,
      specimenprimary,

      /* procedure */
      coalesce(
        specimenprocedurecode, 'ZZ(NULLVAL)'
      ) as specimenprocedurecode,
      coalesce(
        specimenproceduredescr, 'ZZ(NULLVAL)'
      ) as specimenproceduredescr,
      coalesce(
        simple_tree.specimenprocedurecode || ' - ' || simple_tree.specimenproceduredescr,
        'ZZ(NULLVAL)'
      ) as specimenprocedure,
      coalesce(
        specimenidpathologist, 'ZZ(NULLVAL)'
      ) as specimenidpathologist,
      coalesce(specimendictator, 'ZZ(NULLVAL)') as specimendictator,
      coalesce(specimentech, 'ZZ(NULLVAL)') as specimentech,

      /* topography group */
      coalesce(
        specimenshortsourcecode, 'ZZ(NULLVAL)'
      ) as specimenshortsourcecode,
      coalesce(
        specimenshortsourcedescr, 'ZZ(NULLVAL)'
      ) as specimenshortsourcedescr,
      coalesce(
        simple_tree.specimenshortsourcecode || ' - ' || simple_tree.specimenshortsourcedescr,
        'ZZ(NULLVAL)'
      ) as specimenshortsource,

      /* topography detail */
      coalesce(
        specimensourcecode, 'ZZ(NULLVAL)'
      ) as specimensourcecode,
      coalesce(
        specimensourcedescr, 'ZZ(NULLVAL)'
      ) as specimensourcedescr,
      coalesce(
        simple_tree.specimensourcecode || ' - ' || simple_tree.specimensourcedescr,
        'ZZ(NULLVAL)'
      ) as specimensource,
      iddiagnosis,
      diagnosistype,
      diagnosistext,
      coalesce(morphologycode, 'ZZ(NULLVAL)') as morphologydetailcode,
      coalesce(morphologydescr, 'ZZ(NULLVAL)') as morphologydetaildescr,
      coalesce(
        simple_tree.morphologycode || ' - ' || simple_tree.morphologydescr,
        'ZZ(NULLVAL)'
      ) as morphologydetail,
      -- snomedorder,
      snomedcodegroup,
      snomedT,
      snomedM,
      snomedP,
      snomedOther,
      blockid,
      blocknumber,
      blockcreationdate,
      coalesce(blocktypecode, 'ZZ(NULLVAL)') as blocktypecode,
      coalesce(blocktypedescr, 'ZZ(NULLVAL)') as blocktypedescr,
      blockpiececount,
      blockprintuser,
      blockprintdate,
      slideid,
      slidenumber,
      slidecreationdate,
      coalesce(
        slidestaintypecode, 'ZZ(NULLVAL)'
      ) as slidestaintypecode,
      coalesce(
        slidestaintypedescr, 'ZZ(NULLVAL)'
      ) as slidestaintypedescr,
      coalesce(
        simple_tree.slidestaintypecode || ' - ' || simple_tree.slidestaintypedescr,
        'ZZ(NULLVAL)'
      ) as slidestaintype,
      slideidprintinguser,
      coalesce(
        slidestainwkgcode, 'ZZ(NULLVAL)'
      ) as slidestainwkgcode,
      coalesce(
        slidestainwkgdescr, 'ZZ(NULLVAL)'
      ) as slidestainwkgdescr,
      coalesce(
        simple_tree.slidestainwkgcode || ' - ' || simple_tree.slidestainwkgdescr,
        'ZZ(NULLVAL)'
      ) as slidestainwkg,
      slidestaindate,
      slideadditional,
      date_fake,
      istituto_rich,
      modalita,
      cod_ais,
      caseduration,
      caseduration_wd
    from
      simple_tree
    where
      casecomplete = 'Y'
      /* https://app.asana.com/0/1201541884750688/1202011167332191 */

      /* https://app.asana.com/0/1201541884750688/1202261875241002 */

      /* and snomedorder = 1 */

      /* https://app.asana.com/0/1201541884750688/1202209587604968 */
      and diagnosistype = 'MAIN_DIAGNOSIS'
      /* explicit filters needed to get filters from other snippets */

      /* a.rigato https://app.asana.com/0/0/1202218805783319/f
       */

      /* https://app.asana.com/0/0/1202258978246707/f */

      /* https://app.asana.com/0/1202039674544482/1204540214900291/f */
  ) as sn_simple_tree
WHERE
  sn_simple_tree.casecreationdate >= CAST(
    '2026-02-01' AS Nullable(Date)
  )
  AND sn_simple_tree.casecreationdate < CAST(
    '2026-02-28' AS Nullable(Date)
  ) + INTERVAL 1 day
GROUP BY
  patientgender
ORDER BY
  sn_simple_tree.patientgender ASC nulls last