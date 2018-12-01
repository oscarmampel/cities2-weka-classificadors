package com.eetac.cities2;

import weka.core.converters.ConverterUtils.DataSource;
import weka.core.Instances;
import weka.filters.unsupervised.instance.imagefilter.PHOGFilter;
import weka.filters.Filter;
import weka.filters.unsupervised.attribute.Remove;
import weka.classifiers.bayes.NaiveBayes;
import weka.classifiers.trees.RandomForest;
import weka.core.Instance;
import java.util.Random;

public class Indoor {

    public static void main(String[] args) throws Exception {
        // carrego el datasource
        DataSource source = new DataSource("datasets/indoor.arff");
        Instances data = source.getDataSet();
        if (data.classIndex() == -1)
            data.setClassIndex(data.numAttributes() - 1);
        System.out.print(data.numInstances());

        // aplico el phogFilter
        String[] optionsPhog = new String[2];
        optionsPhog[0] = "-D";
        optionsPhog[1] = "datasets";
        PHOGFilter phog = new PHOGFilter();
        phog.setOptions(optionsPhog);
        phog.setInputFormat(data);
        Instances phogData = Filter.useFilter(data, phog);

        // elimino el atribut que representa la direcció de la imatge
        String[] optionsR = new String[2];
        optionsR[0] = "-R";
        optionsR[1] = "1";
        Remove remove = new Remove();
        remove.setOptions(optionsR);
        remove.setInputFormat(phogData);
        Instances phogClearData = Filter.useFilter(phogData, remove);

        Random rand = new Random(30);
        Instances randData = new Instances(phogClearData);
        randData.randomize(rand);

        int numFolds = 10;//divideixo el dataset amb 10 troços
        double correctClassified = 0;
        double incorrectClassified = 0;

        for (int fold = 0; fold < numFolds; fold++) {
            // divideixo el dataset en un dataset de entrenament i un de test
            /**
             *    * testDataset
             *    + trainDataset
             * 
             * fold = 0 dataset es dividiria com a *++++++++++
             * fold = 1 dataset es dividiria com a +*+++++++++
             * fold = 2 dataset es dividiria com a ++*++++++++
             * fold = 3 dataset es dividiria com a +++*+++++++
             * fold = 4 dataset es dividiria com a ++++*++++++
             * fold = 5 dataset es dividiria com a +++++*+++++
             * etz
             */
            Instances testData = randData.testCV(numFolds, fold);
            Instances trainData = randData.trainCV(numFolds, fold, rand);

            // entreno el algoritme que buscara les flors
            NaiveBayes naiveBayes = new NaiveBayes();
            naiveBayes.buildClassifier(trainData);

            // entreno el algoritme per a la resta
            RandomForest randomForest = new RandomForest();
            String options = "-P 100 -I 100 -num-slots 1 -K 0 -M 1.0 -V 0.001 -S 1";
            randomForest.setOptions(options.split(" "));
            randomForest.buildClassifier(trainData);
            System.out.println("build fold: "+fold);

            for (Instance instance : testData) {
                //classifico per trobar les floristeries
                double d = naiveBayes.classifyInstance(instance);

                //miro si es una floristeria
                if (d == 1.0) {
                    //miro si la floristeria ha estat classificada be
                    if (instance.classValue() == 1.0) {
                        correctClassified++;
                    } else {
                        incorrectClassified++;
                    }
                } 
                //miro les instancies que no han sortit com a floristeria
                else {
                    d = randomForest.classifyInstance(instance);
                    //miro si han estat ben classificades
                    if (d == instance.classValue()) {
                        correctClassified++;
                    } else {
                        incorrectClassified++;
                    }
                }
            }

            System.out.println("test fold: "+fold);
        }

        System.out.println("Correctly Classified Instances "+correctClassified / (correctClassified + incorrectClassified));
    }
}